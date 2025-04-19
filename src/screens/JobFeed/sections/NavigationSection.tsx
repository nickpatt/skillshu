import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { supabase } from "../../../lib/supabase";

export const NavigationSection = (): JSX.Element => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(profile);
      }
    };

    getUser();
  }, []);

  // Navigation menu items data
  const navItems = [
    { name: "Home", path: "/", isActive: false },
    { name: "Find Posting", path: "/feed", isActive: true },
    { name: "Dashboard", path: "#", isActive: false },
  ];

  return (
    <nav className="flex flex-col items-start shadow-[inset_0px_-1px_0px_#e4e5e8] w-full bg-graywhite">
      {/* Top navigation bar */}
      <div className="flex w-full items-center justify-between px-[300px] py-0 bg-gray-50">
        <div className="flex items-start gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-1 px-0 py-3.5 bg-[#f1f2f4]"
            >
              <div
                className={`${item.isActive ? "font-bold" : "font-normal"} text-[#5e6670] text-sm leading-5 relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] tracking-[0] whitespace-nowrap`}
              >
                {item.name}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img
              className="w-[50px] h-[34px] object-cover"
              alt="University logo"
              src="/image-1.png"
            />
            <span className="font-normal text-gray-600 text-sm whitespace-nowrap">
              University of Texas at Austin
            </span>
          </div>
          {user ? (
            <Link to="/profile" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>
                  {profile?.full_name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600">
                {profile?.full_name || 'My Profile'}
              </span>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="ghost" className="text-gray-600">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Main navigation with search and action buttons */}
      <div className="flex w-full items-center justify-between px-[300px] py-5 bg-graywhite">
        <div className="flex items-center justify-center gap-8">
          {/* Logo */}
          <Link to="/">
            <img
              className="relative w-[45px] h-[50px] object-cover"
              alt="Logo"
              src="/screenshot-2025-04-15-at-2-51-11-am-1-1.png"
            />
          </Link>

          {/* Search bar */}
          <div className="relative w-[668px] h-[50px]">
            <Input
              className="h-[50px] w-full rounded-[5px] bg-graywhite border border-solid border-[#e4e5e8] pl-6"
              placeholder="Posting title, keyword, person"
            />
            <Button
              className="absolute top-[7px] right-[5px] p-[5px] bg-[#cb6015] rounded"
              size="icon"
              variant="default"
            >
              <img
                className="w-[25px] h-[25px] object-cover"
                alt="Search icon"
                src="/image-4-1.png"
              />
            </Button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          {!user ? (
            <Link to="/signup">
              <Button
                variant="outline"
                className="px-6 py-3 rounded-[3px] border border-solid border-[#ffedcc] text-warning-600 font-button-button font-[number:var(--button-button-font-weight)] text-[length:var(--button-button-font-size)] tracking-[var(--button-button-letter-spacing)] leading-[var(--button-button-line-height)]"
              >
                Register
              </Button>
            </Link>
          ) : null}

          <Link to={user ? "/create-post" : "/login"}>
            <Button className="px-6 py-3 rounded-[3px] bg-warning-600 text-graywhite font-button-button font-[number:var(--button-button-font-weight)] text-[length:var(--button-button-font-size)] tracking-[var(--button-button-letter-spacing)] leading-[var(--button-button-line-height)]">
              Post A Job
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};