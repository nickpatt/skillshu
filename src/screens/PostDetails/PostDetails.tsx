import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ThumbsUp, MessageCircle, Share2, Send, Trash2, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { Textarea } from "../../components/ui/textarea";
import { NavigationSection } from "../Homepage/sections/NavigationSection";
import { FooterSection } from "../Homepage/sections/FooterSection";
import { supabase } from "../../lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

/**
 * Post Interface
 * Defines the structure of a post object in the application
 * @property {string} id - Unique identifier for the post
 * @property {string} title - Title of the post
 * @property {string} description - Detailed description of the post
 * @property {string} rate - Payment rate or budget for the job
 * @property {string} location - Location where the job will be performed
 * @property {string} status - Current status of the post (e.g., 'OPEN_TO_WORK')
 * @property {string[]} skills - Array of required skills
 * @property {string[]} image_urls - Array of image URLs attached to the post
 * @property {string} created_at - Timestamp of post creation
 * @property {number} views - Number of times the post has been viewed
 * @property {number} applications - Number of applications received
 * @property {string} user_id - ID of the user who created the post
 * @property {Object} user - User information object
 */
interface Post {
  id: string;
  title: string;
  description: string;
  rate: string;
  location: string;
  status: string;
  skills: string[];
  image_urls: string[];
  created_at: string;
  views: number;
  applications: number;
  user_id: string;
  user: {
    id: string;
    full_name: string;
    avatar_url: string;
  };
}

/**
 * Comment Interface
 * Defines the structure of a comment object
 * @property {string} id - Unique identifier for the comment
 * @property {string} content - Text content of the comment
 * @property {string} created_at - Timestamp of comment creation
 * @property {Object} user - User information object
 */
interface Comment {
  id: string;
  content: string;
  created_at: string;
  user: {
    id: string;
    full_name: string;
    avatar_url: string;
  };
}

/**
 * PostDetails Component
 * 
 * A comprehensive component for displaying and interacting with a single post.
 * Features include:
 * - Detailed post information display
 * - Image gallery for post attachments
 * - Like/unlike functionality
 * - Comment system with real-time updates
 * - Post deletion (for post owner)
 * - Loading states and error handling
 * 
 * The component integrates with Supabase for:
 * - Post data fetching
 * - Comment management
 * - Like system
 * - Image storage
 * - User authentication
 * 
 * UI Features:
 * - Responsive layout
 * - Loading skeleton
 * - Image previews
 * - User avatars
 * - Interactive buttons
 * - Comment form
 * - Delete confirmation dialog
 * 
 * @returns {JSX.Element} The rendered PostDetails component
 */
export const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user?.id || null);
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    fetchPost();
    fetchComments();
    checkIfLiked();
    fetchLikesCount();
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          user:profiles(id, full_name, avatar_url)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!post || !currentUser || currentUser !== post.user_id) return;

    try {
      setIsDeleting(true);

      // Delete post images from storage if they exist
      if (post.image_urls && post.image_urls.length > 0) {
        for (const url of post.image_urls) {
          const path = url.split('/').pop();
          if (path) {
            await supabase.storage
              .from('post-images')
              .remove([`${currentUser}/${path}`]);
          }
        }
      }

      // Delete the post
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', post.id);

      if (error) throw error;

      // Navigate back to feed
      navigate('/feed');
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('post_comments')
        .select(`
          *,
          user:profiles(id, full_name, avatar_url)
        `)
        .eq('post_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const checkIfLiked = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', id)
        .eq('user_id', user.id);

      setIsLiked(data !== null && data.length > 0);
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  };

  const fetchLikesCount = async () => {
    try {
      const { count, error } = await supabase
        .from('post_likes')
        .select('id', { count: 'exact' })
        .eq('post_id', id);

      if (error) throw error;
      setLikesCount(count || 0);
    } catch (error) {
      console.error('Error fetching likes count:', error);
    }
  };

  const handleLike = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      if (isLiked) {
        const { error } = await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', id)
          .eq('user_id', user.id);

        if (error) throw error;
        setIsLiked(false);
        setLikesCount(prev => prev - 1);
      } else {
        const { error } = await supabase
          .from('post_likes')
          .insert([{ post_id: id, user_id: user.id }]);

        if (error) throw error;
        setIsLiked(true);
        setLikesCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleComment = async () => {
    if (!newComment.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('post_comments')
        .insert([{
          post_id: id,
          user_id: user.id,
          content: newComment.trim()
        }]);

      if (error) throw error;

      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationSection />
        <div className="container mx-auto py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationSection />
        <div className="container mx-auto py-8">
          <p className="text-center text-gray-500">Post not found</p>
        </div>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationSection />
      
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={post.user.avatar_url} />
                    <AvatarFallback>
                      {post.user.full_name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{post.user.full_name}</h2>
                    <p className="text-sm text-gray-500">
                      Posted {formatDistanceToNow(new Date(post.created_at))} ago
                    </p>
                  </div>
                </div>
                {currentUser === post.user_id && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline" className="text-warning-600 bg-warning-50 border-warning-200">
                      {post.rate}
                    </Badge>
                    <Badge className="bg-success-50 text-success-500">
                      {post.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600">{post.description}</p>
                </div>

                {post.image_urls && post.image_urls.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {post.image_urls.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Post image ${index + 1}`}
                        className="rounded-lg w-full h-64 object-cover"
                      />
                    ))}
                  </div>
                )}

                {post.skills && post.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="bg-gray-50 text-gray-600"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <Button
                      variant="ghost"
                      className={`flex items-center gap-2 ${isLiked ? 'text-warning-600' : ''}`}
                      onClick={handleLike}
                    >
                      <ThumbsUp className="h-5 w-5" />
                      <span>{likesCount}</span>
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      <span>{comments.length}</span>
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Share2 className="h-5 w-5" />
                      <span>Share</span>
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{post.views} Views</span>
                    <span>{post.applications} Applications</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Comments</h2>
              
              <div className="flex gap-4 mb-6">
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1"
                />
                <Button
                  className="bg-warning-600"
                  onClick={handleComment}
                  disabled={!newComment.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={comment.user.avatar_url} />
                      <AvatarFallback>
                        {comment.user.full_name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{comment.user.full_name}</h3>
                          <span className="text-sm text-gray-500">
                            {formatDistanceToNow(new Date(comment.created_at))} ago
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {comments.length === 0 && (
                  <p className="text-center text-gray-500">No comments yet. Be the first to comment!</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <FooterSection />
    </div>
  );
};