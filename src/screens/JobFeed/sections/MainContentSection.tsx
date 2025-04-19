import React, { useEffect, useState } from "react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { supabase } from "../../../lib/supabase";
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage, getInitials } from "../../../components/ui/avatar";

interface Post {
  id: string;
  title: string;
  rate: string;
  status: string;
  location: string;
  description: string;
  skills: string[];
  created_at: string;
  views: number;
  applications: number;
  image_urls: string[];
  user: {
    id: string;
    full_name: string;
    avatar_url: string;
  };
}

export const MainContentSection = (): JSX.Element => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'applied'>('recent');

  useEffect(() => {
    fetchPosts();
  }, [sortBy]);

  const fetchPosts = async () => {
    try {
      let query = supabase
        .from('posts')
        .select(`
          *,
          user:profiles(id, full_name, avatar_url)
        `);

      switch (sortBy) {
        case 'popular':
          query = query.order('views', { ascending: false });
          break;
        case 'applied':
          query = query.order('applications', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const incrementViews = async (postId: string) => {
    try {
      await supabase
        .from('posts')
        .update({ views: posts.find(p => p.id === postId)?.views + 1 })
        .eq('id', postId);
      
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-full space-y-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Recent Postings</h1>
        <div className="flex items-center gap-2">
          <Button 
            variant={sortBy === 'recent' ? "default" : "outline"} 
            className={sortBy === 'recent' ? "bg-warning-600" : "text-gray-600"}
            onClick={() => setSortBy('recent')}
          >
            Most Recent
          </Button>
          <Button 
            variant={sortBy === 'popular' ? "default" : "outline"} 
            className={sortBy === 'popular' ? "bg-warning-600" : "text-gray-600"}
            onClick={() => setSortBy('popular')}
          >
            Most Popular
          </Button>
          <Button 
            variant={sortBy === 'applied' ? "default" : "outline"} 
            className={sortBy === 'applied' ? "bg-warning-600" : "text-gray-600"}
            onClick={() => setSortBy('applied')}
          >
            Most Applied
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.user.avatar_url} />
                        <AvatarFallback>
                          {getInitials(post.user.full_name)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {post.title}
                      </h3>
                      <Badge variant="outline" className="text-warning-600 bg-warning-50 border-warning-200">
                        {post.rate}
                      </Badge>
                      <Badge className="bg-success-50 text-success-500">
                        {post.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{post.location}</p>
                    <p className="text-gray-500 text-sm">Posted by {post.user.full_name}</p>
                  </div>

                  <p className="text-gray-700">{post.description}</p>

                  {post.image_urls && post.image_urls.length > 0 && (
                    <div className="flex gap-2 mt-4">
                      {post.image_urls.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Post image ${index + 1}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    {post.skills && post.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="bg-gray-50 text-gray-600"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  className="bg-warning-600 text-white"
                  onClick={() => incrementViews(post.id)}
                >
                  View Details
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Posted {formatDistanceToNow(new Date(post.created_at))} ago</span>
                <div className="flex items-center gap-4">
                  <span>{post.views} Views</span>
                  <span>{post.applications} Applications</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {posts.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No posts found. Be the first to create a post!
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};