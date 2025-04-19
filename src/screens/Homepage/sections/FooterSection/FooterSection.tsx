import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import React from "react";

export const FooterSection = (): JSX.Element => {
  // Footer navigation data
  const footerColumns = [
    {
      title: "Offering Skills",
      links: ["Your Dashboard", "Browse Requests", "Saved Gigs"],
    },
    {
      title: "Looking for Help",
      links: ["Post a Request", "Browse Skills", "Your Requests", "Messages"],
    },
    {
      title: "Support",
      links: ["Faqs", "Privacy Policy", "Terms & Conditions"],
    },
  ];

  return (
    <footer className="flex flex-col items-center w-full bg-[#18191c]">
      <div className="w-full max-w-[1320px] py-24">
        <div className="grid grid-cols-4 gap-8">
          {/* Logo and Contact Info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <img
                className="w-[45px] h-[50px] object-cover"
                alt="Screenshot"
                src="/screenshot-2025-04-15-at-2-51-11-am-1-1.png"
              />
              <h2 className="font-semibold text-white text-4xl leading-10 whitespace-nowrap">
                Skill Issue
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-start">
                <span className="font-body-large-400 text-gray-600 text-[length:var(--body-large-400-font-size)] tracking-[var(--body-large-400-letter-spacing)] leading-[var(--body-large-400-line-height)]">
                  Call now:
                </span>
                <span className="font-medium text-graywhite text-lg tracking-[0] leading-7 whitespace-nowrap">
                  {" "}
                  (949)432-1025
                </span>
              </div>
              <p className="font-normal text-[#767f8c] text-sm tracking-[0] leading-5 w-[312px]">
                University of Texas at Austin
              </p>
            </div>
          </div>

          {/* Navigation Columns */}
          {footerColumns.map((column, index) => (
            <div key={index} className="flex flex-col gap-4">
              <h3 className="font-body-XL-500 text-graywhite text-[length:var(--body-XL-500-font-size)] tracking-[var(--body-XL-500-letter-spacing)] leading-[var(--body-XL-500-line-height)] w-[200px]">
                {column.title}
              </h3>
              <div className="flex flex-col gap-1">
                {column.links.map((link, linkIndex) => (
                  <div
                    key={linkIndex}
                    className="flex items-center gap-1 py-1.5"
                  >
                    <a
                      href="#"
                      className="font-body-medium-400 text-gray-400 text-[length:var(--body-medium-400-font-size)] text-center tracking-[var(--body-medium-400-letter-spacing)] leading-[var(--body-medium-400-line-height)] whitespace-nowrap"
                    >
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright and Social Media */}
      <div className="w-full flex items-center justify-between px-[300px] py-6 bg-[#18191c] shadow-[inset_0px_1px_0px_#2f3338]">
        <p className="font-normal text-[#767f8c] text-sm tracking-[0] leading-5 whitespace-nowrap">
          @ 2025 Skill Issue - Job Portal. All rights Reserved
        </p>
        <div className="flex items-center gap-5">
          <a href="#" aria-label="Facebook">
            <FacebookIcon className="w-2.5 h-5 text-gray-400" />
          </a>
          <a href="#" aria-label="Youtube">
            <YoutubeIcon className="w-5 h-5 text-gray-400" />
          </a>
          <a href="#" aria-label="Instagram">
            <InstagramIcon className="w-5 h-5 text-gray-400" />
          </a>
          <a href="#" aria-label="Twitter">
            <TwitterIcon className="w-5 h-5 text-gray-400" />
          </a>
        </div>
      </div>
    </footer>
  );
};
