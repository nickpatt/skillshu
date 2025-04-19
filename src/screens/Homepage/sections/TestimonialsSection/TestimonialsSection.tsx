import { MapPinIcon, StarIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";

// Testimonial data for mapping
const testimonials = [
  {
    name: "Chris Wong",
    status: { text: "OPEN TO WORK", type: "success" },
    rate: "$30/hour",
    title: "Violin Tutor",
    location: "Jester West, University of Texas at Austin",
    stars: [
      "/group-216.png",
      "/group-217.png",
      "/group-218.png",
      "/group-219.png",
      "/group-220.png",
    ],
    quote:
      '"Chris is organized and enthusiastic about helping his students improve. I made UT orchestra thanks to his help."',
    gradient: true,
  },
  {
    name: "Sara Moore",
    status: { text: "OPEN TO WORK", type: "success" },
    rate: "Commission Based",
    title: "Origami Maker",
    location: "Welch Hall, University of Texas at Austin",
    stars: [
      "/group-221.png",
      "/group-222.png",
      "/group-223.png",
      "/group-224.png",
      "/group-225.png",
    ],
    quote:
      '"I gifted Sara\'s origami rose bouquet for my 6 month anniversary, and my girlfriend cried"',
    gradient: true,
  },
  {
    name: "Lillian Lee",
    status: { text: "CLOSED", type: "danger" },
    rate: "$40/hour",
    title: "BME 303 | BME 303K Tutor",
    location: "Littlefield Hall, University of Texas at Austin",
    stars: [
      "/group-226.png",
      "/group-227.png",
      "/group-228.png",
      "/group-229.png",
      "/group-230.png",
    ],
    quote:
      '"Fully saved my BME grade. I got a 96% after our tutoring sessions!"',
    gradient: false,
  },
];

export const TestimonialsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-[50px] py-[100px] bg-white">
      <h2 className="font-heading-01 font-[number:var(--heading-01-font-weight)] text-gray-scale900 text-[length:var(--heading-01-font-size)] text-center tracking-[var(--heading-01-letter-spacing)] leading-[var(--heading-01-line-height)] [font-style:var(--heading-01-font-style)]">
        Trusted by Students
      </h2>

      <Carousel className="w-full max-w-[1320px]">
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-1/3 px-3">
              <Card
                className={`flex flex-col h-full border border-solid border-[#e4e5e8] shadow-[0px_2px_18px_#18191c08] rounded-lg ${
                  testimonial.gradient
                    ? "[background:linear-gradient(90deg,rgba(255,246,230,1)_0%,rgba(255,255,255,1)_100%),linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)]"
                    : "bg-gray-00"
                }`}
              >
                <CardContent className="flex flex-col gap-5 p-6">
                  <div className="flex flex-col gap-1.5 w-full">
                    <div className="font-body-large-500 font-[number:var(--body-large-500-font-weight)] text-gray-900 text-[length:var(--body-large-500-font-size)] tracking-[var(--body-large-500-letter-spacing)] leading-[var(--body-large-500-line-height)] [font-style:var(--body-large-500-font-style)]">
                      {testimonial.name}
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        className={`bg-${testimonial.status.type}-50 text-${testimonial.status.type}-500 rounded-[3px] px-2 py-1 font-semibold text-xs leading-3`}
                      >
                        {testimonial.status.text}
                      </Badge>
                      <span className="font-body-small-400 font-[number:var(--body-small-400-font-weight)] text-gray-500 text-[length:var(--body-small-400-font-size)] tracking-[var(--body-small-400-letter-spacing)] leading-[var(--body-small-400-line-height)] whitespace-nowrap [font-style:var(--body-small-400-font-style)]">
                        {testimonial.rate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="font-body-medium-500 font-[number:var(--body-medium-500-font-weight)] text-gray-900 text-[length:var(--body-medium-500-font-size)] tracking-[var(--body-medium-500-letter-spacing)] leading-[var(--body-medium-500-line-height)] [font-style:var(--body-medium-500-font-style)]">
                        {testimonial.title}
                      </div>

                      <div className="flex items-center gap-1 w-full">
                        <MapPinIcon className="w-[18px] h-[18px]" />
                        <span className="flex-1 font-body-small-400 font-[number:var(--body-small-400-font-weight)] text-gray-500 text-[length:var(--body-small-400-font-size)] tracking-[var(--body-small-400-letter-spacing)] leading-[var(--body-small-400-line-height)] [font-style:var(--body-small-400-font-style)]">
                          {testimonial.location}
                        </span>
                      </div>
                    </div>

                    <StarIcon className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex gap-0.5">
                      {testimonial.stars.map((star, i) => (
                        <div key={i} className="relative w-7 h-7">
                          <img
                            className="absolute w-[23px] h-[22px] top-0.5 left-0.5"
                            alt="Star rating"
                            src={star}
                          />
                        </div>
                      ))}
                    </div>

                    <p className="font-body-medium-400 font-[number:var(--body-medium-400-font-weight)] text-gray-scale700 text-[length:var(--body-medium-400-font-size)] tracking-[var(--body-medium-400-letter-spacing)] leading-[var(--body-medium-400-line-height)] [font-style:var(--body-medium-400-font-style)]">
                      {testimonial.quote}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex justify-between w-full absolute top-1/2 -translate-y-1/2 px-4">
          <CarouselPrevious className="relative bg-gray-scalewhite h-12 w-12 rounded-[5px] border-0" />
          <CarouselNext className="relative bg-gray-scalewhite h-12 w-12 rounded-[5px] border-0" />
        </div>
      </Carousel>

      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((dot, index) => (
          <div
            key={index}
            className={`${index === 2 ? "w-6 bg-[#f98738]" : "w-2.5 bg-warning-200"} h-2.5 rounded-[32px]`}
          />
        ))}
      </div>
    </section>
  );
};
