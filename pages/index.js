import SmallSelectMenu from "@/components/SmallSelectMenu";
import CountryLine from "@/components/sidebar/CountryLine";
import RatingLine from "@/components/sidebar/RatingLine";
import SelectMenu from "@/components/sidebar/SelectMenu";
import VersionLine from "@/components/sidebar/VersionLine";

import { FaDownload } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdArrowDropDown, MdRssFeed } from "react-icons/md";
import { TbBellFilled, TbBraces, TbPlus } from "react-icons/tb";

import Review from "@/components/Review";
import { useState } from "react";
import { HiPlusSm } from "react-icons/hi";

import { ApplicationsData } from "../public/review";
const itemsPerPage = 10;
const maxPaginationNumbers = 5;

const index = () => {
  const [product, setProduct] = useState("My App +2");
  const productsList = ["My App +1", "My App +2", "My App +3", "My App +4"];

  const [sortingBy, setSortingBy] = useState("Newest First");
  const sortingBysList = ["Newest First", "Older First"];

  const [translation, setTranslation] = useState("English");
  const translationList = ["English", "French", "Arabic", "Japanese"];

  const [reviewDate, setReviewDate] = useState("all time");
  const reviewDatesList = [
    "all time",
    "1 year ago",
    "1 month ago",
    "1 day ago",
  ];

  const [openRatingFilter, setOpenRatingFilter] = useState(true);

  const [openVersionFilter, setOpenVersionFilter] = useState(true);

  const [openCountryFilter, setOpenCountryFilter] = useState(true);

  // ------------------------ Pagination Logic ------------------------
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(ApplicationsData.length / itemsPerPage);

  // Slice the data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = ApplicationsData.slice(startIndex, endIndex);

  // Update the current page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate an array of pagination numbers
  const generatePaginationNumbers = () => {
    if (totalPages <= maxPaginationNumbers) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const currentPageIndex = currentPage - 1;
    const halfMaxPagination = Math.floor(maxPaginationNumbers / 2);
    let startPageIndex = currentPageIndex - halfMaxPagination;
    let endPageIndex = currentPageIndex + halfMaxPagination;

    if (startPageIndex < 0) {
      endPageIndex += Math.abs(startPageIndex);
      startPageIndex = 0;
    } else if (endPageIndex >= totalPages) {
      startPageIndex -= endPageIndex - (totalPages - 1);
      endPageIndex = totalPages - 1;
    }

    const paginationNumbers = [];

    if (startPageIndex > 0) {
      paginationNumbers.push(1);
      if (startPageIndex > 1) {
        paginationNumbers.push("...");
      }
    }

    for (let i = startPageIndex; i <= endPageIndex; i++) {
      paginationNumbers.push(i + 1);
    }

    if (endPageIndex < totalPages - 1) {
      if (endPageIndex < totalPages - 2) {
        paginationNumbers.push("...");
      }
      paginationNumbers.push(totalPages);
    }

    return paginationNumbers;
  };

  return (
    <div className="mx-auto">
      <div className="bg-white fixed top-0 left-0 w-screen z-50 flex justify-between items-stretch px-2 py-4 border-b-2 border-zinc-300">
        <div className="flex flex-col justify-center items-start mx-16 gap-2 w-5/12">
          <p className="font-medium ">select products</p>
          <SelectMenu
            text={product}
            list={productsList}
            changingAction={setProduct}
          />
        </div>
        <div className="flex justify-center items-center gap-6 mx-10">
          <div className="flex flex-col justify-center items-start gap-2">
            <p className="font-medium ">sorting</p>
            <SmallSelectMenu
              text={sortingBy}
              list={sortingBysList}
              changingAction={setSortingBy}
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <p className="font-medium ">translation</p>
            <SmallSelectMenu
              text={translation}
              list={translationList}
              changingAction={setTranslation}
            />
          </div>
        </div>
      </div>
      <div className="mt-24 flex items-start">
        {/* Side bar Menu */}
        <div className="fixed h-full w-3/12 flex-1 flex flex-col items-center justify-start p-3 gap-2 my-4 border-r-2 border-zinc-300">
          <div className="flex flex-col items-stretch justify-center gap-2 w-11/12">
            {/* Search bar */}
            <div className="flex items-center justify-start rounded-md border-2 border-zinc-300 py-2 px-3 textinput">
              <FiSearch size={24} />
              <input
                type="text"
                className="indent-2 h-max w-full focus:outline-none"
                placeholder="search"
              />
            </div>
            {/* Filter by Date */}
            <SelectMenu
              text={reviewDate}
              list={reviewDatesList}
              changingAction={setReviewDate}
            />
          </div>

          <div className="flex flex-col items-start justify-center w-full ml-4 my-3 gap-4">
            {/* Filter by Rating  */}
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <div
                onClick={() => setOpenRatingFilter((prev) => !prev)}
                className="flex items-center justify-center gap-2 cursor-pointer"
              >
                {/* Expand / Dismiss Icon */}
                {openRatingFilter ? (
                  <MdArrowDropDown size={20} />
                ) : (
                  <HiPlusSm size={20} />
                )}
                <p className="font-medium text-sm select-none">
                  Filter by Rating
                </p>
              </div>

              {/* Rating Section */}
              <div
                className={
                  "flex-col justify-center items-stretch w-10/12 ml-4 gap-1 " +
                  (openRatingFilter ? "flex" : "hidden")
                }
              >
                <RatingLine rating={5} raters={30} totalRaters={150} />
                <RatingLine rating={4} raters={20} totalRaters={150} />
                <RatingLine rating={3} raters={90} totalRaters={150} />
                <RatingLine rating={2} raters={10} totalRaters={150} />
                <RatingLine rating={1} raters={150} totalRaters={150} />
              </div>
            </div>

            {/* Filter by Version  */}
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <div
                onClick={() => setOpenVersionFilter((prev) => !prev)}
                className="flex items-center justify-center gap-2 cursor-pointer"
              >
                {/* Expand / Dismiss Icon */}
                {openVersionFilter ? (
                  <MdArrowDropDown size={20} />
                ) : (
                  <HiPlusSm size={20} />
                )}
                <p className="font-medium text-sm select-none">
                  Filter by Version
                </p>
              </div>

              <div
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: "100px",
                  paddingRight: "10px",
                }}
                className={
                  "flex-col justify-center items-stretch w-10/12 ml-4 gap-1.5 " +
                  (openVersionFilter ? "flex" : "hidden")
                }
              >
                <VersionLine version={"1.12.0"} occurence={46} />
                <VersionLine version={"1.2.0"} occurence={19} />
                <VersionLine version={"1.1.4"} occurence={6} />
                <VersionLine version={"1.0.0"} occurence={106} />
              </div>
            </div>
            {/* Filter by Country  */}
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <div
                onClick={() => setOpenCountryFilter((prev) => !prev)}
                className="flex items-center justify-center gap-2 cursor-pointer"
              >
                {/* Expand / Dismiss Icon */}
                {openCountryFilter ? (
                  <MdArrowDropDown size={20} />
                ) : (
                  <HiPlusSm size={20} />
                )}
                <p className="font-medium text-sm select-none">
                  Filter by Country
                </p>
              </div>

              <div
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxHeight: "125px",
                  paddingRight: "10px",
                }}
                className={
                  "flex-col justify-start items-stretch w-10/12 ml-4 gap-2 h-full " +
                  (openCountryFilter ? "flex" : "hidden")
                }
              >
                <CountryLine country={"Morocco"} occurence={78} />
                <CountryLine country={"Morocco"} occurence={78} />
                <CountryLine country={"Morocco"} occurence={78} />
                <CountryLine country={"Morocco"} occurence={78} />
                <CountryLine country={"Morocco"} occurence={78} />
              </div>
            </div>
          </div>
        </div>
        <div id="newpage" className="absolute right-0 flex-2 w-9/12 h-screen">
          <div className="my-8 mx-3 flex flex-col justify-center items-center">
            <div className="flex justify-between items-center w-full mb-6">
              <p className="text-md font-semibold">
                Viewing {startIndex + 1}-{endIndex} of {ApplicationsData.length}{" "}
                Reviews
              </p>
              <div className="flex justify-center items-center gap-4 mr-4">
                {/* Create Alert */}
                <div className="flex justify-center items-center border-2 border-zinc-300 rounded-md py-1 px-3 gap-2">
                  <TbBellFilled size={18} />
                  <p className="text-sm font-semibold">Create Alert</p>
                  <MdArrowDropDown size={20} />
                </div>

                {/* Icons */}
                <div className="flex justify-center items-center border-2 border-zinc-300 rounded-md py-1 px-3 gap-3">
                  <MdRssFeed size={20} />
                  <TbBraces size={20} />
                  <FaDownload size={16} />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start items-stretch w-full gap-4">
              {paginatedData.map((review) => {
                return <Review review={review} />;
              })}
            </div>
            <div className="flex justify-center items-center my-2">
              {generatePaginationNumbers().map((pageNumber, index) => (
                <button
                  className={"text-md mx-2 "+(pageNumber === currentPage ? "font-bold" : "font-regular")}
                  key={index}
                  onClick={() => handlePageChange(pageNumber)}
                  disabled={pageNumber === currentPage || pageNumber === "..."}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
