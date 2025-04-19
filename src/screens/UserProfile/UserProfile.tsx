/**
 * UserProfile Component
 * 
 * The main profile page component that displays user information and their posts.
 * The layout consists of:
 * - Navigation bar at the top
 * - Main content area showing user details and posts
 * - Profile sidebar with additional information
 * - Footer at the bottom
 * 
 * Layout Structure:
 * - Header: Full-width navigation
 * - Main: Flexible content area with fixed-width sidebar (20% width)
 * - Footer: Full-width footer
 * 
 * The component uses a light gray background (#f7f9fb) for better readability
 * and maintains a consistent layout structure with other pages.
 * 
 * @returns {JSX.Element} The rendered UserProfile component
 */
import React from "react";
import { FooterSection } from "../Homepage/sections/FooterSection";
import { NavigationSection } from "../Homepage/sections/NavigationSection";
import { MainContentSection } from "./sections/MainContentSection";
import { ProfileSidebarSection } from "./sections/ProfileSidebarSection";

export const UserProfile = (): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#f7f9fb]">
      <header className="w-full">
        <NavigationSection />
      </header>

      <main className="flex flex-1 w-full">
        <div className="flex-1">
          <MainContentSection />
        </div>
        <aside className="w-1/5">
          <ProfileSidebarSection />
        </aside>
      </main>

      <footer className="w-full">
        <FooterSection />
      </footer>
    </div>
  );
};