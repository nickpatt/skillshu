import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { supabase } from "../../lib/supabase";
import { FooterSection } from "../Homepage/sections/FooterSection";
import { NavigationSection } from "../Homepage/sections/NavigationSection";

/**
 * SignUp Schema
 * Defines the validation rules for the signup form using Zod
 * - email: Must be a valid email address
 * - password: Must be at least 8 characters
 * - username: Must be at least 3 characters
 * - fullName: Must be at least 2 characters
 * - college: Must be at least 2 characters
 * - major: Must be at least 2 characters
 * - year: Must be at least 2 characters
 */
const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  fullName: z.string().min(2, "Full name is required"),
  college: z.string().min(2, "College is required"),
  major: z.string().min(2, "Major is required"),
  year: z.string().min(2, "Year is required"),
});

type SignUpForm = z.infer<typeof signUpSchema>;

/**
 * SignUp Component
 * 
 * A comprehensive registration form component that handles new user creation. Features include:
 * - Complete user profile collection (email, password, username, full name, college details)
 * - Form validation using Zod schema
 * - Integration with Supabase for authentication and profile creation
 * - Error handling and display
 * - Navigation to login page after successful registration
 * - Link to login page for existing users
 * 
 * The component uses React Hook Form for form management and includes:
 * - Responsive design with a card layout
 * - Proper error states for each field
 * - Automatic profile creation in the database
 * 
 * @returns {JSX.Element} The rendered SignUp component
 */
export const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (signUpError) throw signUpError;

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              username: data.username,
              full_name: data.fullName,
              school_name: data.college,
              major: data.major,
              year: data.year,
            }
          ]);

        if (profileError) {
          console.error('Profile creation error:', profileError);
          throw new Error(profileError.message);
        }
        
        navigate('/login');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during sign up');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavigationSection />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  {...register("username")}
                  className={errors.username ? "border-red-500" : ""}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="college">College</Label>
                <Input
                  id="college"
                  {...register("college")}
                  className={errors.college ? "border-red-500" : ""}
                />
                {errors.college && (
                  <p className="text-red-500 text-sm">{errors.college.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="major">Major</Label>
                <Input
                  id="major"
                  {...register("major")}
                  className={errors.major ? "border-red-500" : ""}
                />
                {errors.major && (
                  <p className="text-red-500 text-sm">{errors.major.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  {...register("year")}
                  className={errors.year ? "border-red-500" : ""}
                />
                {errors.year && (
                  <p className="text-red-500 text-sm">{errors.year.message}</p>
                )}
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <Button type="submit" className="w-full bg-warning-600">
                Sign Up
              </Button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-warning-600 hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </main>

      <FooterSection />
    </div>
  );
};