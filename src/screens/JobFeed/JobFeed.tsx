/**
 * JobFeed Component
 * 
 * - Navigation bar at the top
 * - Main content area showing job listings
 * - Sidebar with additional filters and information
 * - Footer at the bottom
 * 
 * - Flexible main content area
 * - Fixed-width sidebar (290px)
 * - Proper spacing and padding
 * - Light gray background for better readability
 * 
 * @returns {JSX.Element} The rendered JobFeed component
 */
import React from "react";
import { FooterSection } from "./sections/FooterSection";
import { MainContentSection } from "./sections/MainContentSection";
import { NavigationSection } from "./sections/NavigationSection";
import { SidebarSection } from "./sections/SidebarSection";

export const JobFeed = (): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      <NavigationSection />
      
      <div className="flex flex-1 w-full px-[50px] gap-8 mt-8">
        <div className="flex-1">
          <MainContentSection />
        </div>
        <aside className="w-[290px] shrink-0">
          <SidebarSection />
        </aside>
      </div>

      <FooterSection />
    </div>
  );
};