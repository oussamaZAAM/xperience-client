import Stars from "../Stars";

const RatingLine = ({rating, raters, totalRaters}) => {
  return (
    <div className="flex justify-between items-center h-full w-full gap-5">
      {/* Rating  */}
      <Stars rating={rating} size={"small"} />
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
