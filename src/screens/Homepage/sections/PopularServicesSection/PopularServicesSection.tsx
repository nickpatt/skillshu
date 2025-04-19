import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const PopularServicesSection = (): JSX.Element => {
  // Data for service categories
  const serviceCategories = [
    {
      icon: "💇",
      title: "Haircuts",
      positions: "45,904 Open Positions",
    },
    {
      icon: "📚",
      title: "Tutoring",
      positions: "50,364 Open Positions",
    },
    {
      icon: "🛠",
      title: "Fixes",
      positions: "4,339 Open Positions",
    },
    {
      icon: "💅",
      title: "Nails",
      positions: "20,079 Open Positions",
    },
  ];

  return (
    <section className="flex flex-col items-start gap-[50px] px-6 py-[100px] w-full bg-graywhite shadow-[inset_0px_-1px_0px_#e4e5e8] md:px-[300px]">
      <h2 className="font-heading-01 text-[#18191c] text-[length:var(--heading-01-font-size)] tracking-[var(--heading-01-letter-spacing)] leading-[var(--heading-01-line-height)] [font-style:var(--heading-01-font-style)]">
        What can I find on Skill Issue?
      </h2>

      <div className="flex flex-col items-start gap-8 w-full">
        <div className="flex flex-wrap items-start gap-6 w-full">
          {serviceCategories.map((category, index) => (
            <Card
              key={index}
              className="border-none shadow-none flex-1 min-w-[280px]"
            >
              <CardContent className="p-0">
                <div className="flex flex-col items-start gap-2">
                  <div className="font-medium text-[#18191c] text-lg leading-7">
                    {category.icon} {category.title}
                  </div>
                  <div className="font-normal text-[#767f8c] text-sm leading-5">
                    {category.positions}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
