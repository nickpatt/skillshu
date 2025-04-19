import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const CallToActionSection = (): JSX.Element => {
  return (
    <section className="flex justify-center gap-6 px-6 py-[100px] bg-[#f1f2f4] md:px-[300px]">
      <Card className="flex-1 p-0 overflow-hidden border-0 rounded-xl">
        <CardContent className="p-0">
          <div
            className="flex flex-col items-start gap-[26px] p-[50px] rounded-xl bg-cover bg-center"
            style={{ backgroundImage: "url(..//candidate---employers.png)" }}
          >
            <div className="flex flex-col items-start gap-4">
              <h2 className="font-heading-03 text-gray-scale900 text-[length:var(--heading-03-font-size)] tracking-[var(--heading-03-letter-spacing)] leading-[var(--heading-03-line-height)]">
                Looking to Earn?
              </h2>

              <p className="opacity-80 font-normal text-gray-scale600 text-sm leading-5">
                Start a Profile, List Your Talent, and <br />
                Start Getting Booked!
              </p>
            </div>

            <Button
              variant="outline"
              className="bg-gray-scalewhite rounded-[3px] px-6 py-3 h-auto"
            >
              <span className="font-button-button font-[number:var(--button-button-font-weight)] text-warning-600 text-[length:var(--button-button-font-size)] tracking-[var(--button-button-letter-spacing)] leading-[var(--button-button-line-height)]">
                Start Offering Skills
              </span>
              <ArrowRightIcon className="w-6 h-6 ml-3" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1 p-0 overflow-hidden border-0 rounded-xl">
        <CardContent className="p-0">
          <div
            className="flex flex-col items-start gap-[26px] p-[50px] rounded-xl bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(127deg,rgba(0,43,108,0.5) 0%,rgba(0,43,108,0) 49%),url(..//candidate---employers-1.png)",
            }}
          >
            <div className="flex flex-col items-start gap-4">
              <h2 className="font-heading-03 text-gray-scalewhite text-[length:var(--heading-03-font-size)] tracking-[var(--heading-03-letter-spacing)] leading-[var(--heading-03-line-height)]">
                Need a Hand?
              </h2>

              <p className="opacity-80 font-normal text-gray-scalewhite text-sm leading-5">
                Post a Request and find the help you need.
              </p>
            </div>

            <Button
              variant="outline"
              className="bg-gray-scalewhite rounded-[3px] px-6 py-3 h-auto"
            >
              <span className="font-button-button font-[number:var(--button-button-font-weight)] text-warning-600 text-[length:var(--button-button-font-size)] tracking-[var(--button-button-letter-spacing)] leading-[var(--button-button-line-height)]">
                Post A Request
              </span>
              <ArrowRightIcon className="w-6 h-6 ml-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
