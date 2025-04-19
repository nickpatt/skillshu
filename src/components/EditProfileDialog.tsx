import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { supabase } from "../lib/supabase";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  pronouns: z.string().optional(),
  bio: z.string().optional(),
  skills: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().email("Invalid email"),
  avatarUrl: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: any;
}

export const EditProfileDialog = ({ open, onOpenChange, profile }: EditProfileDialogProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profile?.full_name?.split(' ')[0] || '',
      lastName: profile?.full_name?.split(' ')[1] || '',
      pronouns: profile?.pronouns || '',
      bio: profile?.bio || '',
      skills: profile?.skills || '',
      phoneNumber: profile?.phone_number || '',
      email: profile?.email || '',
      avatarUrl: profile?.avatar_url || '',
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No user found');
      }

      // First, check if the profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (!existingProfile) {
        // If profile doesn't exist, create it
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{
            id: user.id,
            full_name: `${data.firstName} ${data.lastName}`,
            bio: data.bio,
            pronouns: data.pronouns,
            skills: data.skills,
            phone_number: data.phoneNumber,
            email: data.email,
            avatar_url: data.avatarUrl,
          }]);

        if (insertError) throw insertError;
      } else {
        // If profile exists, update it
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            full_name: `${data.firstName} ${data.lastName}`,
            bio: data.bio,
            pronouns: data.pronouns,
            skills: data.skills,
            phone_number: data.phoneNumber,
            email: data.email,
            avatar_url: data.avatarUrl,
          })
          .eq('id', user.id);

        if (updateError) throw updateError;
      }

      onOpenChange(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...register("firstName")} />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...register("lastName")} />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatarUrl">Profile Picture URL</Label>
            <Input id="avatarUrl" {...register("avatarUrl")} placeholder="https://example.com/avatar.jpg" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pronouns">Pronouns</Label>
            <Input id="pronouns" {...register("pronouns")} placeholder="e.g. she/her" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              {...register("bio")} 
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Input 
              id="skills" 
              {...register("skills")} 
              placeholder="e.g. Graphic Design, Web Development, Photography"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input 
              id="phoneNumber" 
              {...register("phoneNumber")} 
              placeholder="(123) 456-7890"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              {...register("email")} 
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};