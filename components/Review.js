import missing_flag from "@/public/icons/missing_flag.png";
import { COLORS } from "@/utils/colors";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

import Stars from "./Stars";
import { fetchCountry } from "./fetchCountry";

const country = "Japan";

const Review = () => {
  const [flag, setFlag] = useState(missing_flag);
  useEffect(() => {
    fetchCountry(country)
      .then((flag) => setFlag(flag))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="flex flex-col justify-start items-center shadow-xl rounded-lg bg-white w-full p-5 gap-6">
      {/* Review Title + Rating  */}
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-end items-center gap-6">
          <div
            style={{ backgroundColor: COLORS.violet }}
            className="h-8 w-8 rounded-lg"
          ></div>
          <div
            style={{ backgroundColor: COLORS.gray }}
            className="flex justify-center items-center h-8 rounded px-3"
          >
            <p className="text-sm font-medium">iOS</p>
          </div>
          <p className="text-lg font-semibold">I use it every day!</p>
          <Stars rating={5} size="big" />
        </div>
        <div className="flex justify-center items-center border-2 border-black rounded py-0.5 px-2.5">
          <p className="text-sm font-bold">TRANSLATED</p>
        </div>
      </div>
      {/* Review Body */}

      <p className="text.sm font-regular">
        I've only been using it for a short time, but I really like it so far!
        It's not that it's 100% perfect, there are things that could be
        improved. But it's pretty close to perfect.
      </p>

      {/* Review Infos + Interactions */}
      <div className="flex justify-between itens-center w-full">
        <div className="flex justify-center items-center gap-4">
          {/* Author */}
          <p className="font-semibold text-sm">By Misa</p>

          {/* Timestamp */}
          <p className="font-semibold text-sm">1 hour ago</p>

          {/* Version */}
          <p className="font-semibold text-sm">v1.12.0</p>

          {/* Country */}
          <div className="flex justify-start items-center gap-2">
            <Image
              className="rounded w-8 h-5 border"
              src={flag}
              height={175}
              width={175}
              alt={"Country: " + country}
            />
            <p className="font-semibold text-left text-sm">{country}</p>
          </div>
        </div>

        {/* Reply + Share */}
        <div className="flex justify-center items-center gap-8">
          {/* Reply */}
          <div className="flex justify-center items-center cursor-pointer m-1 py-1 px-2 hover:border-4 rounded hover:m-0">
            <p className="font-medium text-sm">reply</p>
          </div>

          {/* Share */}
          <div className="flex justify-center items-center cursor-pointer gap-1 m-1 py-1 px-2 hover:border-4 rounded hover:m-0">
            <p className="font-medium text-sm">share</p>
            <MdKeyboardArrowDown size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
