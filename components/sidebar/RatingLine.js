import { COLORS } from "@/utils/colors";
import { AiFillStar } from "react-icons/ai";

const RatingLine = ({rating, raters, totalRaters}) => {
  return (
    <div className="flex justify-between items-center h-full w-full gap-5">
      {/* Rating  */}
      <div className="flex justify-center items-center">
        <AiFillStar size={20} color={rating >= 1 ? COLORS.golden : COLORS.gray} />
        <AiFillStar size={20} color={rating >= 2 ? COLORS.golden : COLORS.gray} />
        <AiFillStar size={20} color={rating >= 3 ? COLORS.golden : COLORS.gray} />
        <AiFillStar size={20} color={rating >= 4 ? COLORS.golden : COLORS.gray} />
        <AiFillStar size={20} color={rating === 5 ? COLORS.golden : COLORS.gray} />
      </div>
      {/* Rating Percentage  */}
      <div className="flex justify-start items-center h-5 w-full">
        <div
          style={{ width: (raters * 100) / totalRaters + "%" }}
          className="justify-items-start rounded bg-zinc-300 h-5"
        ></div>
      </div>
      {/* Rating Number  */}
      <p className="text-end text-zinc-400">{raters}</p>
    </div>
  );
};

export default RatingLine;
