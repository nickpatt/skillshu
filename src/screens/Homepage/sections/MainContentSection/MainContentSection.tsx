import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";

export const MainContentSection = (): JSX.Element => {
  // Data for statistics cards
  const statsCards = [
    {
      icon: "/briefcase-duotone-1.svg",
      count: "1,75,324",
      description: "Students offering Services",
      highlighted: false,
    },
    {
      icon: "/buildings-duotone-1.svg",
      count: "97,354",
      description: "Connections this Week",
      highlighted: true,
    },
    {
      icon: "/users-duotone-1.svg",
      count: "38,47,154",
      description: "Jobs Posted",
      highlighted: false,
    },
    {
      icon: "/briefcase-duotone-1.svg",
      count: "7,532",
      description: "New Jobs",
      highlighted: false,
    },
  ];

  // SearchIcon suggestions
  const searchSuggestions = [
    { text: "Designer", highlighted: false },
    { text: "Programing", highlighted: false },
    { text: "Digital Marketing", highlighted: true },
    { text: "Video", highlighted: false },
    { text: "Animation", highlighted: false },
  ];

  return (
    <section className="w-full py-24 bg-[#f1f2f499]">
      <div className="container flex flex-col lg:flex-row items-start justify-between gap-8">
        {/* Left content - Text, search and stats */}
        <div className="flex flex-col gap-8 max-w-[652px]">
          {/* Heading and description */}
          <div className="flex flex-col gap-6">
            <h1 className="font-display-01 font-[number:var(--display-01-font-weight)] text-[#18191c] text-[length:var(--display-01-font-size)] tracking-[var(--display-01-letter-spacing)] leading-[var(--display-01-line-height)] [font-style:var(--display-01-font-style)]">
              Every Student has a Skill - Show Yours Off
            </h1>
            <p className="font-body-large-400 font-[number:var(--body-large-400-font-weight)] text-gray-600 text-[length:var(--body-large-400-font-size)] tracking-[var(--body-large-400-letter-spacing)] leading-[var(--body-large-400-line-height)] [font-style:var(--body-large-400-font-style)] max-w-[600px]">
              A student powered marketplace built for Longhorns, by Longhorns.
              Post gigs, offer services, and support one another.
            </p>
          </div>

          {/* SearchIcon section */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 p-3 bg-gray-scalewhite rounded-lg shadow-search-shadow border border-solid border-[#e4e5e8]">
              <div className="flex items-center relative w-full">
                <Input
                  className="h-14 bg-gray-scalewhite rounded-[5px] border-none pl-4 font-body-medium-400 text-gray-400"
                  placeholder="Physics 1 Tutor, Nail Tech..."
                />
                <div className="absolute right-0 h-8 w-px bg-[url(/line-1.svg)]" />
              </div>
              <Button className="p-[5px] bg-[#cb6015] rounded flex items-center justify-center">
                <img
                  className="w-[25px] h-[25px]"
                  alt="Search"
                  src="/image-4-1.png"
                />
              </Button>
            </div>

            {/* SearchIcon suggestions */}
            <div className="flex flex-wrap items-center text-sm">
              <span className="text-gray-400 [font-family:'Inter',Helvetica] font-normal leading-5">
                Suggestion:
              </span>
              {searchSuggestions.map((suggestion, index) => (
                <span
                  key={index}
                  className={`ml-1 ${
                    suggestion.highlighted
                      ? "font-body-small-500 font-[number:var(--body-small-500-font-weight)] text-primary-500 text-[length:var(--body-small-500-font-size)] tracking-[var(--body-small-500-letter-spacing)] leading-[var(--body-small-500-line-height)] [font-style:var(--body-small-500-font-style)]"
                      : "text-gray-700 [font-family:'Inter',Helvetica] font-normal leading-5"
                  }`}
                >
                  {index > 0 && " "}
                  {suggestion.text}
                  {index < searchSuggestions.length - 1 ? "," : "."}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right content - Illustration */}
        <div className="w-full max-w-[492px] h-[382px] relative">
          <div className="relative h-[382px]">
            {/* All the SVG background elements */}
            <div className="absolute w-[254px] h-[239px] top-[5px] left-[234px]">
              <div className="absolute w-[122px] h-[66px] top-0 left-[115px]">
                <div className="absolute w-[122px] h-[7px] top-[53px] left-0 bg-[url(/group.png)] bg-[100%_100%]" />
                <div className="absolute w-[121px] h-px top-[53px] left-0 bg-[url(/group-1.png)] bg-[100%_100%]" />
                <div className="absolute w-[15px] h-[50px] top-1 left-[7px] bg-[url(/group-2.png)] bg-[100%_100%]" />
                <div className="absolute w-[15px] h-[34px] top-5 left-[21px] bg-[url(/group-3.png)] bg-[100%_100%]" />
                <div className="absolute w-2 h-[5px] top-2.5 left-[21px] bg-[url(/group-4.png)] bg-[100%_100%]" />
                <div className="absolute w-[23px] h-[43px] top-[11px] left-[29px] bg-[url(/group-5.png)] bg-[100%_100%]" />
                <div className="absolute w-[5px] h-[52px] top-px left-12 bg-[url(/group-6.png)] bg-[100%_100%]" />
                <div className="absolute w-[15px] h-[54px] top-0 left-12 bg-[url(/group-7.png)] bg-[100%_100%]" />
                <div className="absolute w-5 h-[7px] top-2.5 left-[29px] bg-[url(/group-8.png)] bg-[100%_100%]" />
                <div className="absolute w-[11px] h-[47px] top-[7px] left-[61px] bg-[url(/group-9.png)] bg-[100%_100%]" />
                <div className="absolute w-px h-[11px] top-[3px] left-[69px] bg-[url(/group-10.png)] bg-[100%_100%]" />
                <div className="absolute w-[5px] h-[52px] top-0.5 left-[70px] bg-[url(/group-11.png)] bg-[100%_100%]" />
                <div className="absolute w-[11px] h-2 top-[59px] left-[17px] bg-[url(/group-12.png)] bg-[100%_100%]" />
                <div className="absolute w-[3px] h-[7px] top-[59px] left-[26px] bg-[url(/group-13.png)] bg-[100%_100%]" />
                <div className="absolute w-0.5 h-1.5 top-[60px] left-[25px] bg-[url(/group-14.png)] bg-[100%_100%]" />
                <div className="absolute w-[3px] h-[5px] top-[60px] left-[25px] bg-[url(/group-15.png)] bg-[100%_100%]" />
                <div className="absolute w-[37px] h-[7px] top-[47px] left-[83px] bg-[url(/group-16.png)] bg-[100%_100%]" />
                <div className="absolute w-0.5 h-[7px] top-[41px] left-[88px] bg-[url(/group-17.png)] bg-[100%_100%]" />
                <div className="absolute w-7 h-2 top-[41px] left-[88px] bg-[url(/group-18.png)] bg-[100%_100%]" />
                <div className="absolute w-[9px] h-2 top-[58px] left-[82px] bg-[url(/group-60.png)] bg-[100%_100%]" />
                <div className="absolute w-1.5 h-1.5 top-[59px] left-[90px] bg-[url(/group-61.png)] bg-[100%_100%]" />
                <div className="absolute w-0.5 h-[5px] top-[58px] left-[88px] bg-[url(/group-62.png)] bg-[100%_100%]" />
                <div className="absolute w-[7px] h-2 top-[46px] left-14 bg-[url(/group-68.png)] bg-[100%_100%]" />
                <div className="absolute w-[11px] h-0.5 top-[11px] left-[50px] bg-[url(/group-69.png)] bg-[100%_100%]" />
                <div className="absolute w-[11px] h-[3px] top-[7px] left-12 bg-[url(/group-70.png)] bg-[100%_100%]" />
                <div className="absolute w-2.5 h-[25px] top-[29px] left-[33px] bg-[url(/group-71.png)] bg-[100%_100%]" />
              </div>

              {/* More SVG elements - keeping all the illustration elements */}
              <div className="absolute w-[87px] h-[62px] top-[105px] left-[167px]">
                {/* SVG content preserved */}
                <div className="absolute w-[87px] h-[62px] top-0 left-0">
                  <div className="absolute w-px h-1.5 top-[51px] left-0 bg-[url(/group-19.png)] bg-[100%_100%]" />
                  <div className="absolute w-[87px] h-px top-[50px] left-0 bg-[url(/group-20.png)] bg-[100%_100%]" />
                  <div className="absolute w-[86px] h-px top-[55px] left-px bg-[url(/group-21.png)] bg-[100%_100%]" />
                  <div className="absolute w-px h-1 top-[51px] left-[86px] bg-[url(/group-22.png)] bg-[100%_100%]" />
                  <div className="absolute w-1 h-[13px] top-[38px] left-2 bg-[url(/group-23.png)] bg-[100%_100%]" />
                  <div className="absolute w-[3px] h-3 top-[38px] left-[25px] bg-[url(/group-24.png)] bg-[100%_100%]" />
                  <div className="absolute w-6 h-[3px] top-[35px] left-[5px] bg-[url(/group-25.png)] bg-[100%_100%]" />
                  <div className="absolute w-6 h-1 top-[33px] left-1.5 bg-[url(/group-26.png)] bg-[100%_100%]" />
                  <div className="absolute w-4 h-[26px] top-[9px] left-0 bg-[url(/group-27.png)] bg-[100%_100%]" />
                  <div className="absolute w-[11px] h-[34px] top-0 left-3 bg-[url(/group-28.png)] bg-[100%_100%]" />
                  <div className="absolute w-[9px] h-[18px] top-3.5 left-1 bg-[url(/group-29.png)] bg-[100%_100%]" />
                  <div className="absolute w-[3px] h-1.5 top-3 left-3.5 bg-[url(/group-30.png)] bg-[100%_100%]" />
                  <div className="absolute w-1 h-[5px] top-[7px] left-[18px] bg-[url(/group-31.png)] bg-[100%_100%]" />
                  <div className="absolute w-[9px] h-[9px] top-[11px] left-[22px] bg-[url(/group-32.png)] bg-[100%_100%]" />
                  <div className="absolute w-2 h-[22px] top-3 left-6 bg-[url(/group-33.png)] bg-[100%_100%]" />
                  <div className="absolute w-2 h-3.5 top-[18px] left-[21px] bg-[url(/group-34.png)] bg-[100%_100%]" />
                  <div className="absolute w-[7px] h-[5px] top-[46px] left-2.5 bg-[url(/group-35.png)] bg-[100%_100%]" />
                  <div className="absolute w-3.5 h-[9px] top-[41px] left-2.5 bg-[url(/group-36.png)] bg-[100%_100%]" />
                  <div className="absolute w-3.5 h-2.5 top-[38px] left-[13px] bg-[url(/group-37.png)] bg-[100%_100%]" />
                  <div className="absolute w-2 h-1.5 top-[38px] left-[19px] bg-[url(/group-38.png)] bg-[100%_100%]" />
                  <div className="absolute w-[31px] h-1.5 top-11 left-11 bg-[url(/group-39.png)] bg-[100%_100%]" />
                  <div className="absolute w-[23px] h-[5px] top-10 left-[52px] bg-[url(/group-40.png)] bg-[100%_100%]" />
                  <div className="absolute w-1.5 h-1.5 top-14 left-[5px] bg-[url(/group-42.png)] bg-[100%_100%]" />
                  <div className="absolute w-2.5 h-1.5 top-14 left-[9px] bg-[url(/group-43.png)] bg-[100%_100%]" />
                  <div className="absolute w-0.5 h-1 top-14 left-3.5 bg-[url(/group-44.png)] bg-[100%_100%]" />
                  <div className="absolute w-[11px] h-1.5 top-14 left-[59px] bg-[url(/group-45.png)] bg-[100%_100%]" />
                  <div className="absolute w-0.5 h-1.5 top-[55px] left-[68px] bg-[url(/group-46.png)] bg-[100%_100%]" />
                  <div className="absolute w-[5px] h-[5px] top-14 left-[68px] bg-[url(/group-47.png)] bg-[100%_100%]" />
                </div>
                <div className="absolute w-[9px] h-[3px] top-[37px] left-[60px] bg-[url(/group-41.png)] bg-[100%_100%]" />
              </div>

              {/* Continuing with all SVG elements */}
              <div className="absolute w-[41px] h-9 top-[50px] left-0">
                <div className="absolute w-[41px] h-9 top-0 left-0">
                  <div className="absolute w-px h-8 top-1 left-0 bg-[url(/group-48.png)] bg-[100%_100%]" />
                  <div className="absolute w-[41px] h-px top-[35px] left-0 bg-[url(/group-49.png)] bg-[100%_100%]" />
                  <div className="absolute w-[39px] h-px top-1 left-0 bg-[url(/group-50.png)] bg-[100%_100%]" />
                  <div className="absolute w-px h-8 top-1 left-[39px] bg-[url(/group-51.png)] bg-[100%_100%]" />
                  <div className="absolute w-1 h-[5px] top-0 left-[19px] bg-[url(/group-52.png)] bg-[100%_100%]" />
                </div>
                <div className="absolute w-9 h-[26px] top-[7px] left-0.5">
                  <div className="absolute w-px h-[26px] top-0 left-0 bg-[url(/group-53.png)] bg-[100%_100%]" />
                  <div className="absolute w-9 h-px top-[25px] left-0 bg-[url(/group-54.png)] bg-[100%_100%]" />
                  <div className="absolute w-px h-[26px] top-0 left-[35px] bg-[url(/group-55.png)] bg-[100%_100%]" />
                  <div className="absolute w-[35px] h-px top-px left-0 bg-[url(/group-56.png)] bg-[100%_100%]" />
                  <div className="absolute w-[23px] h-1.5 top-[18px] left-0 bg-[url(/group-57.png)] bg-[100%_100%]" />
                  <div className="absolute w-[17px] h-[3px] top-4 left-[15px] bg-[url(/group-58.png)] bg-[100%_100%]" />
                </div>
                <div className="absolute w-[5px] h-[5px] top-[15px] left-[17px] bg-[url(/group-59.png)] bg-[100%_100%]" />
              </div>

              {/* Continuing with all SVG elements */}
              <div className="absolute w-px h-4 top-[202px] left-[174px] bg-[url(/group-63.png)] bg-[100%_100%]" />
              <div className="absolute w-10 h-px top-[218px] left-40 bg-[url(/group-64.png)] bg-[100%_100%]" />
              <div className="absolute w-px h-2.5 top-[220px] left-[182px] bg-[url(/group-65.png)] bg-[100%_100%]" />
              <div className="absolute w-9 h-px top-[230px] left-40 bg-[url(/group-66.png)] bg-[100%_100%]" />
              <div className="absolute w-px h-2 top-[231px] left-[169px] bg-[url(/group-67.png)] bg-[100%_100%]" />
            </div>

            {/* Continuing with all SVG elements - preserving the entire illustration */}
            <div className="absolute w-[102px] h-[101px] top-[169px] left-[171px]">
              <div className="relative w-[103px] h-[101px] -left-px">
                <img
                  className="absolute w-[82px] h-[57px] top-[45px] left-0"
                  alt="Vector"
                  src="/vector-22.svg"
                />
                <div className="absolute w-3 h-2.5 top-20 left-12 bg-[url(/group-72.png)] bg-[100%_100%]" />
                <div className="absolute w-2.5 h-2 top-[89px] left-[15px] bg-[url(/group-73.png)] bg-[100%_100%]" />
                <div className="absolute w-[7px] h-[9px] top-[92px] left-[23px] bg-[url(/group-74.png)] bg-[100%_100%]" />
                <img
                  className="absolute w-[54px] h-[67px] top-0 left-[49px]"
                  alt="Vector"
                  src="/vector-2.svg"
                />
                <div className="absolute w-[37px] h-9 top-0 left-[58px] bg-[url(/group-75.png)] bg-[100%_100%]" />
                <div className="absolute w-[9px] h-[9px] top-10 left-[84px] bg-[url(/group-76.png)] bg-[100%_100%]" />
                <div className="absolute w-10 h-[22px] top-[45px] left-[49px] bg-[url(/group-77.png)] bg-[100%_100%]" />
                <div className="absolute w-2.5 h-[25px] top-[35px] left-[49px] bg-[url(/group-78.png)] bg-[100%_100%]" />
                <img
                  className="absolute w-[68px] h-20 top-[21px] left-[23px]"
                  alt="Vector"
                  src="/vector-4.svg"
                />
                <img
                  className="absolute w-[29px] h-16 top-[37px] left-[60px]"
                  alt="Vector"
                  src="/vector-1.svg"
                />
              </div>
            </div>

            {/* Continuing with all SVG elements */}
            <div className="absolute w-[104px] h-[158px] top-40 left-[248px]">
              <div className="relative h-[158px]">
                <img
                  className="absolute w-[102px] h-[157px] top-px left-0"
                  alt="Vector"
                  src="/vector-3.svg"
                />
                <div className="absolute w-9 h-[7px] top-0.5 left-4 bg-[url(/group-79.png)] bg-[100%_100%]" />
                <div className="absolute w-[86px] h-[130px] top-7 left-0 bg-[url(/group-80.png)] bg-[100%_100%]" />
                <div className="absolute w-[38px] h-4 top-0 left-[67px] bg-[url(/group-81.png)] bg-[100%_100%]" />
                <div className="absolute w-[13px] h-[85px] top-[63px] left-[84px] bg-[url(/group-82.png)] bg-[100%_100%]" />
                <img
                  className="absolute w-[84px] h-[76px] top-[50px] left-3"
                  alt="Vector"
                  src="/vector.svg"
                />
                <img
                  className="absolute w-[63px] h-[55px] top-[67px] left-[33px]"
                  alt="Vector"
                  src="/vector-7.svg"
                />
              </div>
            </div>

            {/* Continuing with all SVG elements */}
            <div className="absolute w-[488px] h-[127px] top-[255px] left-1">
              {/* All SVG content preserved */}
              <div className="relative w-[489px] h-[127px] -top-px">
                <img
                  className="absolute w-[488px] h-[124px] top-0 left-0"
                  alt="Vector"
                  src="/vector-8.svg"
                />
                <img
                  className="absolute w-[407px] h-[58px] top-[70px] left-0"
                  alt="Vector"
                  src="/vector-6.svg"
                />
                <img
                  className="absolute w-[87px] h-[92px] top-[35px] left-[402px]"
                  alt="Vector"
                  src="/vector-5.svg"
                />
                <div className="absolute w-[42px] h-[34px] top-[49px] left-[318px] bg-[url(/group-83.png)] bg-[100%_100%]" />
                <div className="absolute w-14 h-2 top-[82px] left-[318px] bg-[url(/group-84.png)] bg-[100%_100%]" />
                <div className="absolute w-11 h-2 top-[49px] left-[359px] bg-[url(/group-85.png)] bg-[100%_100%]" />
                <div className="absolute w-[31px] h-[33px] top-14 left-[373px] bg-[url(/group-86.png)] bg-[100%_100%]" />
                <div className="absolute w-[39px] h-1.5 top-[77px] left-[331px] bg-[url(/group-87.png)] bg-[100%_100%]" />
                <div className="absolute w-6 h-[5px] top-[73px] left-[350px] bg-[url(/group-88.png)] bg-[100%_100%]" />
                <div className="absolute w-9 h-1.5 top-[65px] left-[344px] bg-[url(/group-89.png)] bg-[100%_100%]" />
                <div className="absolute w-5 h-1 top-[62px] left-[359px] bg-[url(/group-90.png)] bg-[100%_100%]" />
                <div className="absolute w-14 h-[15px] top-[87px] left-[344px] bg-[url(/group-91.png)] bg-[100%_100%]" />
                <div className="absolute w-[22px] h-9 top-[65px] left-[395px] bg-[url(/group-92.png)] bg-[100%_100%]" />
                <div className="absolute w-[7px] h-px top-[92px] left-[368px] bg-[url(/group-93.png)] bg-[100%_100%]" />
                <div className="absolute w-[19px] h-[3px] top-[93px] left-[379px] bg-[url(/group-94.png)] bg-[100%_100%]" />
                <div className="absolute w-[5px] h-px top-[86px] left-[379px] bg-[url(/group-95.png)] bg-[100%_100%]" />
                <div className="absolute w-[15px] h-0.5 top-[86px] left-[388px] bg-[url(/group-96.png)] bg-[100%_100%]" />
                <div className="absolute w-4 h-0.5 top-20 left-[387px] bg-[url(/group-97.png)] bg-[100%_100%]" />
                <div className="absolute w-2 h-0.5 top-[91px] left-[352px] bg-[url(/group-98.png)] bg-[100%_100%]" />
                <div className="absolute w-[31px] h-[7px] top-[35px] left-[369px] bg-[url(/group-99.png)] bg-[100%_100%]" />
                <div className="absolute w-[37px] h-[5px] top-9 left-[371px] bg-[url(/group-100.png)] bg-[100%_100%]" />
                <div className="absolute w-[9px] h-1 top-[39px] left-[399px] bg-[url(/group-101.png)] bg-[100%_100%]" />
                <div className="absolute w-[3px] h-[5px] top-[37px] left-[399px] bg-[url(/group-102.png)] bg-[100%_100%]" />
              </div>
            </div>

            {/* Continuing with all SVG elements */}
            <div className="absolute w-[171px] h-[166px] top-3.5 left-[34px]">
              {/* All SVG content preserved */}
              <div className="absolute w-[18px] h-[21px] top-[142px] left-[94px]">
                <div className="absolute w-[18px] h-[21px] top-px left-0 bg-[url(/group-103.png)] bg-[100%_100%]" />
                <div className="absolute w-3 h-[17px] top-0 left-1.5 bg-[url(/group-104.png)] bg-[url(/group-104.png)] bg-[100%_100%]" />
              </div>
              <div className="absolute w-[22px] h-[23px] top-[86px] left-[111px]">
                <div className="absolute w-1 h-3.5 top-2 left-0 bg-[url(/group-105.png)] bg-[100%_100%]" />
                <div className="absolute w-[22px] h-[23px] top-0 left-px bg-[url(/group-106.png)] bg-[100%_100%]" />
              </div>
              <div className="absolute w-7 h-7 top-[101px] left-[15px] bg-[url(/group-107.png)] bg-[100%_100%]">
                <div className="relative w-3.5 h-4 top-2 left-0.5 bg-[url(/group-108.png)] bg-[100%_100%]" />
              </div>
              <div className="absolute w-5 h-9 top-[46px] left-[75px]">
                <div className="absolute w-5 h-7 top-0 left-0 bg-[url(/group-109.png)] bg-[100%_100%]" />
                <div className="absolute w-2 h-1.5 top-[26px] left-2 bg-[url(/group-110.png)] bg-[100%_100%]" />
                <div className="absolute w-1 h-[5px] top-[31px] left-[9px] bg-[url(/group-111.png)] bg-[100%_100%]" />
              </div>
              <div className="absolute w-[35px] h-[43px] top-0 left-[58px] bg-[url(/group-112.png)] bg-[100%_100%]" />
              <div className="absolute w-1 h-[5px] top-[161px] left-[33px] bg-[url(/group-113.png)] bg-[100%_100%]" />
              <div className="absolute w-1 h-1 top-[129px] left-0 bg-[url(/group-114.png)] bg-[100%_100%]" />
              <div className="absolute w-[3px] h-[3px] top-[132px] left-2.5 bg-[url(/group-115.png)] bg-[100%_100%]" />
              <div className="absolute w-[3px] h-[3px] top-12 left-[146px] bg-[url(/group-116.png)] bg-[100%_100%]" />
              <div className="absolute w-[3px] h-1 top-[99px] left-[168px] bg-[url(/group-117.png)] bg-[100%_100%]" />
            </div>

            {/* Continuing with all SVG elements */}
            <div className="absolute w-[203px] h-[212px] top-0 left-0">
              <div className="absolute w-8 h-[77px] top-[86px] left-[171px]">
                <div className="absolute w-7 h-[75px] top-0.5 left-1 bg-[url(/group-118.png)] bg-[100%_100%]" />
                <div className="absolute w-4 h-[19px] top-0 left-0 bg-[url(/group-122.png)] bg-[100%_100%]" />
              </div>
              <div className="absolute w-[169px] h-[212px] top-0 left-0">
                <div className="absolute w-[169px] h-[212px] top-0 left-0">
                  <div className="absolute w-[116px] h-[124px] top-[87px] left-0">
                    <div className="absolute w-[81px] h-[73px] top-0 left-0 bg-[url(/group-119.png)] bg-[100%_100%]" />
                    <div className="absolute w-[101px] h-[49px] top-[75px] left-[15px] bg-[url(/group-120.png)] bg-[100%_100%]" />
                    <div className="absolute w-2 h-[17px] top-[93px] left-[42px] bg-[url(/group-121.png)] bg-[100%_100%]" />
                    <div className="absolute w-[55px] h-5 top-[62px] left-[37px] bg-[url(/group-123.png)] bg-[100%_100%]" />
                    <div className="absolute w-[13px] h-4 top-[43px] left-[46px] bg-[url(/group-124.png)] bg-[100%_100%]" />
                    <div className="absolute w-[33px] h-[17px] top-7 left-[46px] bg-[url(/group-125.png)] bg-[100%_100%]" />
                    <div className="absolute w-[21px] h-[15px] top-11 left-[57px] bg-[url(/group-126.png)] bg-[100%_100%]" />
                    <div className="absolute w-[15px] h-2.5 top-[33px] left-[50px] bg-[url(/group-127.png)] bg-[100%_100%]" />
                    <div className="absolute w-2 h-1.5 top-[39px] left-[53px] bg-[url(/group-128.png)] bg-[100%_100%]" />
                    <div className="absolute w-[13px] h-[9px] top-[38px] left-[55px] bg-[url(/group-129.png)] bg-[100%_100%]" />
                    <div className="absolute w-[9px] h-1.5 top-11 left-[58px] bg-[url(/group-130.png)] bg-[100%_100%]" />
                    <div className="absolute w-3 h-2 top-[45px] left-[60px] bg-[url(/group-131.png)] bg-[100%_100%]" />
                    <div className="absolute w-[9px] h-3.5 top-[83px] left-[77px] bg-[url(/group-144.png)] bg-[100%_100%]" />
                    <div className="absolute w-[34px] h-3.5 top-[71px] left-[77px] bg-[url(/group-145.png)] bg-[100%_100%]" />
                    <div className="absolute w-[27px] h-3.5 top-[83px] left-[84px] bg-[url(/group-146.png)] bg-[100%_100%]" />
                    <div className="absolute w-[9px] h-2.5 top-[78px] left-[89px] bg-[url(/group-147.png)] bg-[100%_100%]" />
                    <div className="absolute w-1.5 h-[7px] top-[113px] left-[103px] bg-[url(/group-168.png)] bg-[100%_100%]" />
                    <div className="absolute w-[21px] h-[17px] top-[33px] left-[5px] bg-[url(/group-170.png)] bg-[100%_100%]" />
                  </div>
                  <div className="absolute w-[84px] h-[123px] top-0 left-[85px]">
                    <div className="absolute w-[26px] h-4 top-[108px] left-[57px] bg-[url(/group-134.png)] bg-[100%_100%]" />
                    <div className="absolute w-[27px] h-[22px] top-[97px] left-[57px] bg-[url(/group-135.png)] bg-[100%_100%]" />
                    <div className="absolute w-[3px] h-[13px] top-[108px] left-[62px] bg-[url(/group-136.png)] bg-[100%_100%]" />
                    <div className="absolute w-[26px] h-[29px] top-14 left-[18px] bg-[url(/group-137.png)] bg-[100%_100%]" />
                    <div className="absolute w-4 h-2 top-[82px] left-[26px] bg-[url(/group-138.png)] bg-[100%_100%]" />
                    <div className="absolute w-[11px] h-[5px] top-[88px] left-[29px] bg-[url(/group-139.png)] bg-[100%_100%]" />
                    <div className="absolute w-[5px] h-1 top-[93px] left-[31px] bg-[url(/group-140.png)] bg-[100%_100%]" />
                    <div className="absolute w-2 h-2.5 top-[69px] left-6 bg-[url(/group-141.png)] bg-[100%_100%]" />
                    <div className="absolute w-[3px] h-[17px] top-[67px] left-[30px] bg-[url(/group-142.png)] bg-[100%_100%]" />
                    <div className="absolute w-2 h-[9px] top-[68px] left-[30px] bg-[url(/group-143.png)] bg-[100%_100%]" />
                    <div className="absolute w-[50px] h-[39px] top-[79px] left-[9px] bg-[url(/group-151.png)] bg-[100%_100%]" />
                    <div className="absolute w-[3px] h-[15px] top-[53px] left-0 bg-[url(/group-152.png)] bg-[100%_100%]" />
                    <div className="absolute w-3.5 h-[11px] top-[57px] left-px bg-[url(/group-153.png)] bg-[100%_100%]" />
                    <div className="absolute w-[33px] h-[45px] top-[9px] left-px bg-[url(/group-154.png)] bg-[100%_100%]" />
                    <div className="absolute w-[30px] h-[41px] top-[15px] left-[15px] bg-[url(/group-155.png)] bg-[100%_100%]" />
                    <div className="absolute w-[17px] h-2.5 top-0 left-[33px] bg-[url(/group-156.png)] bg-[100%_100%]" />
                    <div className="absolute w-1.5 h-2.5 top-[7px] left-11 bg-[url(/group-157.png)] bg-[100%_100%]" />
                    <div className="absolute w-3.5 h-1.5 top-[9px] left-[33px] bg-[url(/group-158.png)] bg-[100%_100%]" />
                    <div className="absolute w-[13px] h-1.5 top-3 left-[31px] bg-[url(/group-159.png)] bg-[100%_100%]" />
                    <div className="absolute w-[13px] h-1.5 top-[52px] left-0.5 bg-[url(/group-160.png)] bg-[100%_100%]" />
                    <div className="absolute w-[23px] h-[30px] top-[22px] left-[7px] bg-[url(/group-161.png)] bg-[100%_100%]" />
                    <div className="absolute w-[23px] h-[31px] top-3.5 left-[19px] bg-[url(/group-162.png)] bg-[100%_100%]" />
                    <div className="absolute w-1 h-[3px] top-[63px] left-0 bg-[url(/group-163.png)] bg-[100%_100%]" />
                    <div className="absolute w-[3px] h-1 top-[63px] left-px bg-[url(/group-164.png)] bg-[100%_100%]" />
                  </div>
                  <div className="absolute w-[18px] h-[27px] top-[119px] left-[111px] bg-[url(/group-148.png)] bg-[100%_100%]" />
                  <div className="absolute w-[5px] h-[5px] top-[122px] left-[102px] bg-[url(/group-149.png)] bg-[100%_100%]" />
                  <div className="absolute w-1.5 h-[7px] top-[62px] left-[152px] bg-[url(/group-150.png)] bg-[100%_100%]" />
                  <div className="absolute w-1.5 h-3 top-[69px] left-20 bg-[url(/group-165.png)] bg-[100%_100%]" />
                </div>
                <div className="absolute w-[22px] h-[27px] top-[155px] left-[125px]">
                  <div className="absolute w-3 h-[23px] top-[3px] left-0 bg-[url(/group-132.png)] bg-[100%_100%]" />
                  <div className="absolute w-3 h-[27px] top-0 left-2.5 bg-[url(/group-133.png)] bg-[100%_100%]" />
                </div>
                <div className="absolute w-[13px] h-[9px] top-[74px] left-[65px] bg-[url(/group-166.png)] bg-[100%_100%]" />
                <div className="absolute w-2 h-[21px] top-[157px] left-[159px] bg-[url(/group-167.png)] bg-[100%_100%]" />
                <div className="absolute w-[5px] h-1.5 top-[136px] left-[158px] bg-[url(/group-169.png)] bg-[100%_100%]" />
              </div>
            </div>

            {/* Continuing with all SVG elements */}
            <div className="absolute w-[238px] h-[142px] top-[210px] left-[100px]">
              <div className="relative w-[239px] h-[143px] -top-px -left-px">
                <img
                  className="absolute w-[213px] h-[57px] top-16 left-[18px]"
                  alt="Vector"
                  src="/vector-14.svg"
                />
                <div className="absolute w-0.5 h-[3px] top-[120px] left-[153px] bg-[url(/group-171.png)] bg-[100%_100%]" />
                <div className="absolute w-[78px] h-7 top-[95px] left-[153px] bg-[url(/group-172.png)] bg-[100%_100%]" />
                <div className="absolute w-[79px] h-[30px] top-[93px] left-[152px] bg-[url(/group-173.png)] bg-[100%_100%]" />
                <div className="absolute w-[15px] h-[5px] top-[86px] left-[151px] bg-[url(/group-174.png)] bg-[100%_100%]" />
                <div className="absolute w-[9px] h-[7px] top-[85px] left-[164px] bg-[url(/group-175.png)] bg-[100%_100%]" />
                <div className="absolute w-2 h-1.5 top-20 left-[151px] bg-[url(/group-176.png)] bg-[100%_100%]" />
                <div className="absolute w-3.5 h-1.5 top-20 left-[159px] bg-[url(/group-177.png)] bg-[100%_100%]" />
                <div className="absolute w-[34px] h-[13px] top-[91px] left-[147px] bg-[url(/group-178.png)] bg-[100%_100%]" />
                <div className="absolute w-[22px] h-[11px] top-[99px] left-[149px] bg-[url(/group-179.png)] bg-[100%_100%]" />
                <div className="absolute w-3 h-[7px] top-[109px] left-[150px] bg-[url(/group-180.png)] bg-[100%_100%]" />
                <div className="absolute w-[18px] h-[13px] top-[97px] left-[151px] bg-[url(/group-181.png)] bg-[100%_100%]" />
                <div className="absolute w-2.5 h-[7px] top-[95px] left-[150px] bg-[url(/group-182.png)] bg-[100%_100%]" />
                <img
                  className="absolute w-[153px] h-[123px] top-0 left-0"
                  alt="Vector"
                  src="/vector-19.svg"
                />
                <div className="absolute w-[21px] h-[22px] top-[45px] left-[62px] bg-[url(/group-183.png)] bg-[100%_100%]" />
                <div className="absolute w-[13px] h-3 top-[55px] left-[69px] bg-[url(/group-184.png)] bg-[100%_100%]" />
                <div className="absolute w-2.5 h-[9px] top-[60px] left-[73px] bg-[url(/group-185.png)] bg-[100%_100%]" />
                <div className="absolute w-1.5 h-1.5 top-[65px] left-[76px] bg-[url(/group-186.png)] bg-[100%_100%]" />
                <img
                  className="absolute w-1 h-[101px] top-[21px] left-[149px]"
                  alt="Vector"
                  src="/vector-18.svg"
                />
                <img
                  className="absolute w-1 h-[100px] top-[21px] left-[150px]"
                  alt="Vector"
                  src="/vector-20.svg"
                />
                <img
                  className="absolute w-[200px] h-[129px] top-3.5 left-[39px]"
                  alt="Vector"
                  src="/vector-12.svg"
                />
              </div>
            </div>

            <img
              className="absolute w-[18px] h-[19px] top-64 left-[163px]"
              alt="Color"
              src="/color.png"
            />

            {/* Continuing with all SVG elements */}
            <div className="absolute w-[85px] h-[105px] top-[173px] left-[292px]">
              <div className="relative w-[86px] h-[105px] -left-px">
                <img
                  className="absolute w-[82px] h-[52px] top-[53px] left-0"
                  alt="Vector"
                  src="/vector-17.svg"
                />
                <div className="absolute w-3 h-2.5 top-[84px] left-12 bg-[url(/group-187.png)] bg-[100%_100%]" />
                <div className="absolute w-2.5 h-2 top-[92px] left-[15px] bg-[url(/group-188.png)] bg-[100%_100%]" />
                <div className="absolute w-[9px] h-[3px] top-[100px] left-[15px] bg-[url(/group-189.png)] bg-[100%_100%]" />
                <div className="absolute w-[7px] h-[9px] top-24 left-[23px] bg-[url(/group-190.png)] bg-[100%_100%]" />
                <img
                  className="absolute w-10 h-[70px] top-px left-[46px]"
                  alt="Vector"
                  src="/vector-26.svg"
                />
                <div className="absolute w-6 h-[45px] top-0.5 left-[60px] bg-[url(/group-191.png)] bg-[100%_100%]" />
                <div className="absolute w-1.5 h-[11px] top-10 left-[49px] bg-[url(/group-192.png)] bg-[100%_100%]" />
                <div className="absolute w-9 h-[26px] top-[47px] left-[49px] bg-[url(/group-193.png)] bg-[100%_100%]" />
                <div className="absolute w-[3px] h-[26px] top-[46px] left-[83px] bg-[url(/group-194.png)] bg-[100%_100%]" />
                <img
                  className="absolute w-[65px] h-[105px] top-0 left-5"
                  alt="Vector"
                  src="/vector-16.svg"
                />
                <img
                  className="absolute w-[42px] h-[79px] top-[25px] left-11"
                  alt="Vector"
                  src="/vector-23.svg"
                />
              </div>
            </div>

            {/* Continuing with all SVG elements */}
            <div className="absolute w-[93px] h-[109px] top-[66px] left-[252px]">
              <div className="relative h-[109px]">
                <img
                  className="absolute w-[74px] h-[94px] top-3.5 left-3.5"
                  alt="Vector"
                  src="/vector-24.svg"
                />
                <img
                  className="absolute w-[93px] h-[76px] top-0 left-0"
                  alt="Vector"
                  src="/vector-10.svg"
                />
                <div className="absolute w-[31px] h-[52px] top-[37px] left-3.5 bg-[url(/group-195.png)] bg-[100%_100%]" />
                <div className="absolute w-8 h-[23px] top-[66px] left-[43px] bg-[url(/group-196.png)] bg-[100%_100%]" />
                <div className="absolute w-[5px] h-[22px] top-20 left-[62px] bg-[url(/group-197.png)] bg-[100%_100%]" />
                <div className="absolute w-[21px] h-[21px] top-[88px] left-[46px] bg-[url(/group-198.png)] bg-[100%_100%]" />
                <div className="absolute w-[15px] h-3 top-[81px] left-12 bg-[url(/group-199.png)] bg-[100%_100%]" />
                <div className="absolute w-3.5 h-2 top-[82px] left-[47px] bg-[url(/group-200.png)] bg-[100%_100%]" />
                <div className="absolute w-3 h-1.5 top-[83px] left-[47px] bg-[url(/group-201.png)] bg-[100%_100%]" />
                <div className="absolute w-3 h-[9px] top-[83px] left-12 bg-[url(/group-202.png)] bg-[100%_100%]" />
                <div className="absolute w-2.5 h-1.5 top-[85px] left-12 bg-[url(/group-203.png)] bg-[100%_100%]" />
                <div className="absolute w-2.5 h-[7px] top-[85px] left-12 bg-[url(/group-204.png)] bg-[100%_100%]" />
                <div className="absolute w-2 h-1.5 top-[85px] left-[49px] bg-[url(/group-205.png)] bg-[100%_100%]" />
                <div className="absolute w-[22px] h-[29px] top-[38px] left-[11px] bg-[url(/group-206.png)] bg-[100%_100%]" />
                <div className="absolute w-[13px] h-[3px] top-[51px] left-[31px] bg-[url(/group-207.png)] bg-[100%_100%]" />
                <div className="absolute w-[23px] h-[29px] top-9 left-11 bg-[url(/group-208.png)] bg-[100%_100%]" />
                <div className="absolute w-[3px] h-2 top-[49px] left-[22px] bg-[url(/group-209.png)] bg-[100%_100%]" />
                <div className="absolute w-[3px] h-2 top-[47px] left-[54px] bg-[url(/group-210.png)] bg-[100%_100%]" />
                <div className="absolute w-2 h-[13px] top-14 left-[33px] bg-[url(/group-211.png)] bg-[100%_100%]" />
                <div className="absolute w-[7px] h-1.5 top-[72px] left-[41px] bg-[url(/group-212.png)] bg-[100%_100%]" />
                <div className="absolute w-[5px] h-0.5 top-[45px] left-[19px] bg-[url(/group-213.png)] bg-[100%_100%]" />
                <div className="absolute w-1.5 h-0.5 top-[43px] left-[51px] bg-[url(/group-214.png)] bg-[100%_100%]" />
                <div className="absolute w-[13px] h-1 top-[46px] left-[66px] bg-[url(/group-215.png)] bg-[100%_100%]" />
                <img
                  className="absolute w-6 h-[72px] top-1 left-[69px]"
                  alt="Vector"
                  src="/vector-25.svg"
                />
                <img
                  className="absolute w-[18px] h-[22px] top-3.5 left-9"
                  alt="Vector"
                  src="/vector-11.svg"
                />
                <img
                  className="absolute w-[38px] h-[55px] top-[31px] left-[50px]"
                  alt="Vector"
                  src="/vector-9.svg"
                />
                <img
                  className="absolute w-[13px] h-[26px] top-[81px] left-[54px]"
                  alt="Vector"
                  src="/vector-13.svg"
                />
                <img
                  className="absolute w-[9px] h-3 top-[57px] left-[30px]"
                  alt="Vector"
                  src="/vector-15.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics cards */}
      <div className="container flex flex-wrap justify-between gap-4 mt-16">
        {statsCards.map((card, index) => (
          <Card
            key={index}
            className={`flex items-center gap-5 p-5 bg-graywhite rounded-lg ${card.highlighted ? "shadow-hover-shadow-primary" : ""}`}
          >
            <CardContent className="p-0 flex items-center gap-5">
              <div
                className={`p-4 ${card.highlighted ? "bg-primary-500" : "bg-primary-50"} rounded flex items-center justify-center`}
              >
                <img
                  className="w-10 h-10"
                  alt={card.description}
                  src={card.icon}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="w-[180px] font-heading-04 font-[number:var(--heading-04-font-weight)] text-[#18191c] text-[length:var(--heading-04-font-size)] tracking-[var(--heading-04-letter-spacing)] leading-[var(--heading-04-line-height)] [font-style:var(--heading-04-font-style)]">
                  {card.count}
                </h3>
                <p className="w-[180px] font-body-medium-400 font-[number:var(--body-medium-400-font-weight)] text-[#767f8c] text-[length:var(--body-medium-400-font-size)] tracking-[var(--body-medium-400-letter-spacing)] leading-[var(--body-medium-400-line-height)] [font-style:var(--body-medium-400-font-style)]">
                  {card.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
