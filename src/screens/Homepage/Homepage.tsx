/**
 * Homepage Component
 * 
 * The main landing page of the application that showcases the platform's key features
 * and services. It consists of several sections:
 * - Navigation: Main navigation bar
 * - Main Content: Hero section with primary messaging
 * - Popular Services: Display of featured services
 * - How It Works: Step-by-step guide of the platform
 * - Testimonials: User reviews and success stories
 * - Call to Action: Section encouraging user engagement
 * - Footer: Site-wide footer with links and information
 * 
 * @returns {JSX.Element} The rendered Homepage component
 */
import React from "react";
import { CallToActionSection } from "./sections/CallToActionSection";
import { FooterSection } from "./sections/FooterSection";
import { HowItWorksSection } from "./sections/HowItWorksSection/HowItWorksSection";
import { MainContentSection } from "./sections/MainContentSection";
import { NavigationSection } from "./sections/NavigationSection";
import { PopularServicesSection } from "./sections/PopularServicesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection/TestimonialsSection";

export const Homepage = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full bg-graywhite">
      <NavigationSection />
      <MainContentSection />
      <PopularServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CallToActionSection />
      <FooterSection />
    </div>
  );
};
