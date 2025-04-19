import {
  EditIcon,
  GlobeIcon,
  MoreHorizontalIcon,
  NavigationIcon,
  UploadIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { EditProfileDialog } from "../../../components/EditProfileDialog";
import { Badge } from "../../../components/ui/badge";
import { supabase } from "../../../lib/supabase";
import { Input } from "../../../components/ui/input";

interface Profile {
  username: string;
  full_name: string;
  school_name: string;
  major: string;
  year: string;
  bio: string;
  pronouns: string;
  skills: string;
  phone_number: string;
  email: string;
  avatar_url: string | null;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const MainContentSection = (): JSX.Element => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [isEditDialogOpen]);

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
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setUploadError("File size must be less than 5MB");
        return;
      }

      // Validate file type
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setUploadError("File must be an image (JPEG, PNG, or WebP)");
        return;
      }

      setUploading(true);
      setUploadError(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      // Upload image
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Refresh profile data
      fetchProfile();
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const skills = [
    {
      id: 1,
      name: "Graphic Design",
      count: 6,
      photos: [
        "/photo-15.png",
        "/photo-10.png",
        "/photo-17.png",
        "/photo-16.png",
        "/photo-13.png",
      ],
      extraCount: 1,
    },
    {
      id: 2,
      name: "Flyer and Poster Layout",
      count: 7,
      photos: [
        "/photo-9.png",
        "/photo-10.png",
        "/photo-11.png",
        "/photo-12.png",
        "/photo-13.png",
      ],
      extraCount: 2,
    },
    {
      id: 3,
      name: "Canva & Figma",
      count: 5,
      photos: [
        "/photo-14.png",
        "/photo-15.png",
        "/photo-16.png",
        "/photo-17.png",
        "/photo-18.png",
      ],
      extraCount: 0,
    },
  ];

  const experiences = [
    {
      id: 1,
      title: "Freelance UX/UI designer",
      company: "Self Employed",
      location: "Around the world",
      period: "Jun 2016 — Present",
      duration: "3 yrs 3 mos",
      description:
        "Work with clients and web studios as freelancer. Work in next areas: eCommerce web projects; creative landing pages; iOs and Android apps; corporate web sites and corporate identity sometimes.",
      icon: <GlobeIcon className="w-8 h-8" />,
      logo: null,
    },
    {
      id: 2,
      title: "UX/UI designer",
      company: "Upwork",
      location: "International",
      period: "Jun 2019 — Present",
      duration: "3 mos",
      description:
        "New experience with Upwork system. Work in next areas: UX/UI design, graphic design, interaction design, UX research.",
      icon: null,
      logo: "/rectangle-2-2.png",
    },
  ];

  const workHistory = [
    {
      id: 1,
      title: "Creative Facebook Ads Designer",
      rating: 5,
      time: "1 month ago",
      review:
        '"Jasmine was very professional! Great to work with and delivered very aesthetic work; Our customers loved her design"',
      price: "$40 | Fixed",
    },
    {
      id: 2,
      title: "Sports Graphic Design with Social Media Video Editing",
      rating: 5,
      time: "1 month ago",
      review:
        '"Jasmine is an outstanding designer who is passionate about his work! He has a leader-mentality and made sure all work was completed in a timely manner. I will most definitely be hiring her again!',
      price: "$110 | Fixed",
    },
  ];

  return (
    <div className="w-full max-w-[850px] mx-auto mt-44 space-y-6">
      {/* Profile Card */}
      <Card className="relative shadow-[0px_20px_60px_#f1f4f780]">
        <CardContent className="p-0">
          <div className="relative">
            {/* Cover Image */}
            <img
              className="w-full h-[180px] object-cover"
              alt="Cover"
              src="/rectangle-3.png"
            />

            {/* Profile Actions */}
            <div className="absolute w-full flex justify-between px-[30px] top-5">
              <Button
                variant="outline"
                size="icon"
                className="bg-[#ffffffe6] opacity-50 shadow-[0px_10px_30px_#707a840d]"
              >
                <UploadIcon className="h-4 w-4" />
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="bg-[#ffffffe6] shadow-[0px_10px_30px_#707a840d] flex items-center gap-2 h-9"
                  onClick={() => setIsEditDialogOpen(true)}
                >
                  <EditIcon className="h-4 w-4" />
                  <span className="text-xs font-normal text-[#181818]">
                    EDIT PROFILE
                  </span>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="bg-[#ffffffe6] shadow-[0px_10px_30px_#707a840d]"
                >
                  <MoreHorizontalIcon className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Profile Picture */}
            <div className="absolute top-[155px] left-5">
              <div className="w-[180px] h-[180px] rounded-full bg-white p-2">
                <div className="relative w-full h-full group">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    alt="Profile"
                    src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.full_name || '')}&background=random`}
                  />
                  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                    <UploadIcon className="h-8 w-8 text-white" />
                  </label>
                </div>
              </div>
              {uploadError && (
                <p className="text-red-500 text-sm mt-2">{uploadError}</p>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="mt-[155px] px-[30px] pb-[30px]">
            <div className="flex justify-between">
              <div className="ml-[190px]">
                <h2 className="text-lg font-bold text-[#181818]">
                  {profile?.full_name}
                </h2>
                <p className="text-sm font-normal text-[#181818] mt-2 max-w-[583px] leading-[21px]">
                  {profile?.bio || "No bio yet"}
                </p>

                <div className="flex gap-4 mt-7">
                  <Button className="w-[170px] h-8 rounded text-white text-xs font-medium bg-warning-600">
                    CONTACT
                  </Button>

                  <Button
                    variant="outline"
                    className="w-[170px] h-8 border-warning-600 text-black text-xs font-medium"
                  >
                    232 CONNECTIONS
                  </Button>
                </div>
              </div>

              <div className="flex items-start mt-1">
                <NavigationIcon className="w-4 h-4 mr-1 mt-0.5" />
                <span className="text-xs font-normal text-[#181818] leading-[18px]">
                  {profile?.school_name}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="w-full">
        <Tabs defaultValue="profile" className="w-full">
          <div className="relative">
            <TabsList className="w-full h-[50px] p-0 bg-transparent">
              <TabsTrigger
                value="profile"
                className="w-[242px] h-[50px] rounded-[4px_4px_0px_0px] data-[state=active]:text-white data-[state=active]:bg-[#CB6015] data-[state=inactive]:bg-white"
              >
                PROFILE
              </TabsTrigger>
              <TabsTrigger
                value="posts"
                className="w-[242px] h-[42px] data-[state=inactive]:bg-white data-[state=inactive]:border data-[state=inactive]:border-[#e6e6e6]"
              >
                POSTS
              </TabsTrigger>
            </TabsList>
            <Separator className="w-full" />
            <div className="w-full h-[50px] [background:linear-gradient(180deg,rgba(241,244,248,0.8)_0%,rgba(241,244,248,0)_100%)]" />
          </div>

          <TabsContent value="profile" className="space-y-6 mt-5">
            {/* About Section */}
            <Card className="shadow-block-shadow">
              <CardHeader className="pb-0">
                <CardTitle className="text-lg font-bold text-[#181818]">
                  About
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-sm font-normal text-[#181818] leading-[21px]">
                  {profile?.bio}
                </p>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="shadow-[0px_20px_60px_#f1f4f780]">
              <CardHeader className="pb-0">
                <CardTitle className="text-lg font-bold text-[#181818]">
                  Skills &amp; Endoresments
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-3 gap-5">
                  {skills.map((skill) => (
                    <Card
                      key={skill.id}
                      className="w-[250px] h-20 border border-[#f4f4f4]"
                    >
                      <CardContent className="p-0">
                        <div className="flex justify-between items-center px-[19px] pt-[13px]">
                          <h3 className="font-medium text-[#181818] text-sm">
                            {skill.name}
                          </h3>
                          <span className="font-bold text-[#0275b1] text-sm">
                            {skill.count}
                          </span>
                        </div>
                        <div className="flex mt-[13px] px-[19px]">
                          {skill.photos.map((photo, index) => (
                            <img
                              key={index}
                              className="w-6 h-6 object-cover rounded-full -ml-0 first:ml-0"
                              style={{ marginLeft: index > 0 ? "15px" : "0" }}
                              alt="User"
                              src={photo}
                            />
                          ))}
                          {skill.extraCount > 0 && (
                            <div className="w-6 h-6 bg-[#0275b1] rounded-full flex items-center justify-center ml-[15px]">
                              <span className="text-[10px] font-medium text-white">
                                +{skill.extraCount}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button
                  variant="link"
                  className="text-xs font-medium text-[#0275b1] p-0 mt-4"
                >
                  SHOW ALL (17)
                </Button>
              </CardContent>
            </Card>

            {/* Experience Section */}
            <Card className="shadow-[0px_20px_60px_#f1f4f780]">
              <CardHeader className="pb-0">
                <CardTitle className="text-lg font-bold text-[#181818]">
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-5">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    <div className="flex">
                      <div className="w-[54px] h-[54px] rounded-[27px] flex items-center justify-center mr-4">
                        {exp.icon}
                        {exp.logo && (
                          <div
                            className="w-[54px] h-[54px] bg-cover bg-center rounded-full"
                            style={{ backgroundImage: `url(${exp.logo})` }}
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-[#181818] text-sm">
                          {exp.title}
                        </h3>
                        <div className="flex items-center mt-2">
                          <span className="font-normal text-[#181818] text-[10px]">
                            {exp.company}
                          </span>
                          <span className="font-light text-[#181818] text-[10px] ml-2">
                            {exp.location}
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          <span className="font-light text-[#181818] text-[10px]">
                            {exp.period}
                          </span>
                          <span className="font-medium text-[#0275b1] text-[10px] ml-2">
                            {exp.duration}
                          </span>
                        </div>
                        <p className="font-normal text-[#181818] text-[10px] leading-[15px] mt-4 max-w-[719px]">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                    {index < experiences.length - 1 && (
                      <Separator className="mt-5" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Work History Section */}
            <Card className="shadow-[0px_20px_60px_#f1f4f780]">
              <CardHeader className="pb-0">
                <CardTitle className="text-lg font-bold text-[#181818]">
                  Work History
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {workHistory.map((work) => (
                  <Card
                    key={work.id}
                    className="border border-[#f4f4f4] rounded-md"
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-[#181818] text-sm">
                          {work.title}
                        </h3>
                        <span className="font-light text-[#181818] text-[10px]">
                          {work.time}
                        </span>
                      </div>
                      <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-[18px] h-[18px] relative mr-0.5"
                          >
                            <img
                              className="absolute w-[15px] h-3.5 top-0.5 left-0.5"
                              alt="Star"
                              src={`/group${i > 0 ? `-${i + (work.id === 1 ? 5 : 0)}` : work.id === 1 ? "-5" : ""}.png`}
                            />
                          </div>
                        ))}
                      </div>
                      <p className="font-normal text-[#181818] text-[10px] leading-[15px] mt-3">
                        {work.review}
                      </p>
                      <p className="font-normal text-[#181818] text-[10px] leading-[15px] mt-2">
                        {work.price}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts">
            {/* Posts content would go here */}
          </TabsContent>
        </Tabs>
      </div>

      <EditProfileDialog 
        open={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen}
        profile={profile}
      />
    </div>
  );
};