import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { NavigationSection } from "../Homepage/sections/NavigationSection";
import { FooterSection } from "../Homepage/sections/FooterSection";
import { supabase } from "../../lib/supabase";
import { Badge } from "../../components/ui/badge";
import { X } from "lucide-react";

/**
 * File Upload Constants
 * Defines the limitations and accepted formats for file uploads
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

/**
 * Post Schema
 * Defines the validation rules for the post creation form using Zod
 * - title: Must not be empty
 * - description: Must not be empty
 * - rate: Must not be empty
 * - location: Must not be empty
 */
const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  rate: z.string().min(1, "Rate is required"),
  location: z.string().min(1, "Location is required"),
});

type PostFormData = z.infer<typeof postSchema>;

/**
 * CreatePost Component
 * 
 *
 * - Basic post information (title, description, rate, location)
 * - Skills management with add/remove functionality
 * - Image upload with preview and validation
 * - Form validation using Zod schema
 * - Integration with Supabase for data storage
 * 
 * 
 * - File upload handling with size and type validation
 * - Skills management with tag-like interface
 * - Responsive form layout
 * - Error handling and display
 * - Loading states during submission
 * - Automatic navigation after successful post creation
 * 
 * 
 * - Maximum file size: 5MB
 * - Supported formats: JPG, PNG, WebP
 * - Multiple file upload support
 * - Image preview with remove option
 * 
 * @returns {JSX.Element} The rendered CreatePost component
 */
export const CreatePost = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        setError(`${file.name} is too large. Max size is 5MB`);
        return false;
      }
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setError(`${file.name} is not a supported image type`);
        return false;
      }
      return true;
    });
    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSkillAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!selectedSkills.includes(skillInput.trim())) {
        setSelectedSkills(prev => [...prev, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(prev => prev.filter(s => s !== skill));
  };

  const onSubmit = async (data: PostFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to create a post');
      }

      // Upload images if any
      const imageUrls: string[] = [];
      
      if (selectedFiles.length > 0) {
        for (const file of selectedFiles) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${user.id}/${fileName}`;

          const { error: uploadError, data: uploadData } = await supabase.storage
            .from('post-images')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('post-images')
            .getPublicUrl(filePath);

          imageUrls.push(publicUrl);
        }
      }

      const { error: postError } = await supabase
        .from('posts')
        .insert([{
          user_id: user.id,
          title: data.title,
          description: data.description,
          rate: data.rate,
          location: data.location,
          status: 'OPEN_TO_WORK',
          image_urls: imageUrls,
          skills: selectedSkills,
          views: 0,
          applications: 0
        }]);

      if (postError) throw postError;

      navigate('/feed');
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F2F4]">
      <NavigationSection />
      
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-semibold text-gray-900">Create Post</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Looking for a Nail Tech, Denim Clothing Fix..."
                  {...register("title")}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills (Optional)</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedSkills.map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-warning-100 text-warning-800 flex items-center gap-1"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-warning-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillAdd}
                  placeholder="Type a skill and press Enter"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate">Budget/Rate</Label>
                <Input
                  id="rate"
                  placeholder="$30/hour, Fixed Price: $100, etc."
                  {...register("rate")}
                  className={errors.rate ? "border-red-500" : ""}
                />
                {errors.rate && (
                  <p className="text-red-500 text-sm">{errors.rate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="PCL Library, Remote, etc."
                  {...register("location")}
                  className={errors.location ? "border-red-500" : ""}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">{errors.location.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={6}
                  {...register("description")}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Images (Optional)</Label>
                <div className="mt-2">
                  <Input
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="border p-2 w-full"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Max file size: 5MB. Supported formats: JPG, PNG, WebP
                  </p>
                </div>
                {selectedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-warning-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Post"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};