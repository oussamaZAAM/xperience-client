import { COLORS } from "@/utils/colors";
import React from "react";
import { AiFillStar } from "react-icons/ai";

const Stars = ({rating, size}) => {
  return (
    <div className={"flex justify-center items-center " + (size==="big" && "gap-1")}>
      <AiFillStar size={size === "big" ? 24 : 20} color={rating >= 1 ? COLORS.golden : COLORS.gray} />
      <AiFillStar size={size === "big" ? 24 : 20} color={rating >= 2 ? COLORS.golden : COLORS.gray} />
      <AiFillStar size={size === "big" ? 24 : 20} color={rating >= 3 ? COLORS.golden : COLORS.gray} />
      <AiFillStar size={size === "big" ? 24 : 20} color={rating >= 4 ? COLORS.golden : COLORS.gray} />
      <AiFillStar size={size === "big" ? 24 : 20} color={rating === 5 ? COLORS.golden : COLORS.gray}/>
    </div>
  );
};

export default Stars;
