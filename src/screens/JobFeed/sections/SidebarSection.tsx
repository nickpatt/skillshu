import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { supabase } from "../../../lib/supabase";

interface Profile {
  username: string;
  full_name: string;
  major: string;
  year: string;
  school_name: string;
}

export const SidebarSection = (): JSX.Element => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) throw error;
          setProfile(profileData);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Placeholder data for features not yet implemented
  const userData = {
    rating: 4.9,
    reviews: 128,
    completedJobs: 45,
    skills: ["Python", "Java", "React", "UI Design"],
    recentSearches: [
      "Web Development",
      "Graphic Design",
      "Math Tutor",
      "Photography",
    ],
    savedPosts: [
      {
        title: "UI/UX Designer",
        rate: "$25/hour",
        location: "Remote",
      },
      {
        title: "Python Tutor",
        rate: "$30/hour",
        location: "PCL Library",
      },
      {
        title: "Logo Designer",
        rate: "$50/project",
        location: "EER",
      },
    ],
  };

  if (loading) {
    return (
      <div className="w-full space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-gray-200 rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-3 w-32 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="w-full space-y-6">
      {/* User Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>{profile.full_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{profile.full_name}</h3>
              <p className="text-gray-600">
                {profile.major} • {profile.year}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4 text-center">
            <div>
              <p className="font-semibold">{userData.rating}</p>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
            <div>
              <p className="font-semibold">{userData.reviews}</p>
              <p className="text-sm text-gray-600">Reviews</p>
            </div>
            <div>
              <p className="font-semibold">{userData.completedJobs}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium">Skills</p>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill) => (
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
        </CardContent>
      </Card>

      {/* Recent Searches */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Recent Searches</h3>
          <div className="space-y-2">
            {userData.recentSearches.map((search) => (
              <Button
                key={search}
                variant="outline"
                className="w-full justify-start text-gray-600"
              >
                {search}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Saved Posts */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Saved Posts</h3>
          <div className="space-y-4">
            {userData.savedPosts.map((post, index) => (
              <React.Fragment key={post.title}>
                <div className="space-y-2">
                  <h4 className="font-medium">{post.title}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{post.rate}</span>
                    <span>{post.location}</span>
                  </div>
                </div>
                {index < userData.savedPosts.length - 1 && (
                  <Separator className="my-2" />
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};