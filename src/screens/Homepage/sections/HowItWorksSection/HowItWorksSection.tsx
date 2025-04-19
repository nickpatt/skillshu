import {
  CheckCircleIcon,
  UploadCloud,
  SearchIcon,
  UserPlusIcon,
} from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const HowItWorksSection = (): JSX.Element => {
  // Data for the steps cards
  const steps = [
    {
      id: 1,
      icon: <UserPlusIcon className="w-8 h-8" />,
      title: "Sign Up with UT email",
      description: "Quick login with your UT credentials",
      bgColor: "bg-gray-scalewhite",
      highlighted: false,
    },
    {
      id: 2,
      icon: <UploadCloud className="w-8 h-8" />,
      title: "Create Your Skill Card",
      description:
        "Elaborate on what you do: tutoring, art commissions, sewing",
      bgColor: "bg-gray-00",
      highlighted: false,
    },
    {
      id: 3,
      icon: <SearchIcon className="w-8 h-8" />,
      title: "Browse or Post Requests",
      description: "Scroll what others need or offer your help",
      bgColor: "bg-[#f98738]",
      highlighted: true,
    },
    {
      id: 4,
      icon: <CheckCircleIcon className="w-8 h-8" />,
      title: "Connect Instantly",
      description: "Connect, message, and complete",
      bgColor: "bg-gray-scalewhite",
      highlighted: false,
    },
  ];

  return (
    <section className="flex flex-col items-center gap-[50px] px-6 py-[100px] bg-gray-50 w-full md:px-12 lg:px-[300px]">
      <h2 className="font-heading-01 text-[#18191c] text-center">
        How Skill Issue works
      </h2>

      <div className="w-full max-w-[1320px] relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative">
              <Card
                className={`w-full ${step.highlighted ? "bg-white" : "bg-transparent"} border-none shadow-none`}
              >
                <CardContent className="flex flex-col items-center gap-6 p-6">
                  <div
                    className={`p-5 ${step.bgColor} rounded-[80px] flex items-center justify-center`}
                  >
                    {step.icon}
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <h3 className="font-medium text-[#18191c] text-lg text-center leading-7 w-full max-w-[264px]">
                      {step.title}
                    </h3>
                    <p className="font-normal text-[#767f8c] text-sm text-center leading-5 w-full max-w-[264px]">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Arrows between cards (except after the last card) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-[111px] w-[223px] h-[49px] z-10">
                  <img
                    className="w-full h-full"
                    alt="Arrows"
                    src={`/arrows${index === 0 ? "" : `-${index + 1}`}.png`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};