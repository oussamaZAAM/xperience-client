import SmallSelectMenu from "@/components/SmallSelectMenu";
import CountryLine from "@/components/sidebar/CountryLine";
import RatingLine from "@/components/sidebar/RatingLine";
import SelectMenu from "@/components/sidebar/SelectMenu";
import VersionLine from "@/components/sidebar/VersionLine";

import { FaDownload } from "react-icons/fa";
import { FcClearFilters } from "react-icons/fc";
import { FiSearch } from "react-icons/fi";
import { MdArrowDropDown, MdRssFeed } from "react-icons/md";
import { TbBellFilled, TbBraces } from "react-icons/tb";

import Review from "@/components/Review";
import { useEffect, useState } from "react";
import { HiPlusSm } from "react-icons/hi";

import { ApplicationsData } from "../public/review";
import { stringToDate } from "@/components/generalMethods";
const itemsPerPage = 10;
const maxPaginationNumbers = 5;

const index = () => {
  const [filteredData, setFilteredData] = useState(
    ApplicationsData.sort(
      (a, b) => stringToDate(b.reviewDate) - stringToDate(a.reviewDate) // Set it to "Newest First" at first
    )
  );
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState([]);

  // Search bar
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedData, setSearchedData] = useState(ApplicationsData);

  // Filter By App
  const [filteredDataByApp, setFilteredDataByApp] = useState(ApplicationsData);

  // Common Data (between searched data and filtered data)
  const commonData = filteredData.filter(
    (review) =>
      searchedData.includes(review) && filteredDataByApp.includes(review)
  );

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    setSearchedData((prev) => {
      const newFilteredData = ApplicationsData.filter(
        (review) =>
          review.reviewHeading
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          review.reviewText.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return newFilteredData;
    });
  };

  const [product, setProduct] = useState("All Apps");
  const productsList = ["All Apps"];
  ApplicationsData.forEach((review) => {
    if (!productsList.includes(review.appStoreName)) {
      productsList.push(review.appStoreName);
    }
  });

  const [sortingBy, setSortingBy] = useState("Newest First");
  const sortingBysList = ["Newest First", "Oldest First"];

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
  const totalPages = Math.ceil(commonData.length / itemsPerPage);

  // Slice the data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = commonData.slice(startIndex, endIndex);

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
  // --------------------------------------------------------------------

  // Rating Distribution for Rating filter
  const ratingDistribution = [0, 0, 0, 0, 0];
  ratingDistribution[0] = commonData.filter(
    (review) => review.rating === "1"
  ).length;
  ratingDistribution[1] = commonData.filter(
    (review) => review.rating === "2"
  ).length;
  ratingDistribution[2] = commonData.filter(
    (review) => review.rating === "3"
  ).length;
  ratingDistribution[3] = commonData.filter(
    (review) => review.rating === "4"
  ).length;
  ratingDistribution[4] = commonData.filter(
    (review) => review.rating === "5"
  ).length;

  // Version Distribution for Version filter
  const versionDistribution = {};
  commonData.forEach((review) => {
    if (Object.keys(versionDistribution).includes(review.version)) {
      versionDistribution[review.version] =
        versionDistribution[review.version] + 1;
    } else {
      versionDistribution[review.version] = 1;
    }
  });

  // Country Distribution for Country filter
  const countryDistribution = {};
  commonData.forEach((review) => {
    if (Object.keys(countryDistribution).includes(review.countryName)) {
      countryDistribution[review.countryName] =
        countryDistribution[review.countryName] + 1;
    } else {
      countryDistribution[review.countryName] = 1;
    }
  });

  const filterByApp = (value) => {
    var filteredListByApp;
    if (value === "All Apps") {
      setFilteredDataByApp(ApplicationsData);
    } else {
      filteredListByApp = ApplicationsData.filter(
        (review) => review.appStoreName === value
      );
      setFilteredDataByApp(filteredListByApp);
    }
  };

  const filterByTime = (value) => {};

  const filterByArgument = (argument, value) => {
    const filteredList = filteredData.filter(
      (review) => review[argument] === value
    );
    setFilteredData(filteredList);
    setIsFilterApplied(true);
    setFiltersApplied([...filtersApplied, argument]);
  };

  // Sorting Algorithms
  useEffect(() => {
    if (sortingBy == "Newest First") {
      setFilteredData((prev) => {
        return prev.sort(
          (a, b) => stringToDate(b.reviewDate) - stringToDate(a.reviewDate)
        );
      });
    } else if (sortingBy == "Oldest First") {
      setFilteredData((prev) => {
        return prev.sort(
          (a, b) => stringToDate(a.reviewDate) - stringToDate(b.reviewDate)
        );
      });
    }
  }, [sortingBy]);

  return (
    <div className="mx-auto">
      <div className="bg-white fixed top-0 left-0 w-screen z-50 flex justify-between items-stretch px-2 py-4 border-b-2 border-zinc-300">
        <div className="flex flex-col justify-center items-start mx-16 gap-2 w-5/12">
          <p className="font-medium ">select products</p>
          <SelectMenu
            text={product}
            list={productsList}
            changingAction={setProduct}
            filter={{ action: filterByApp }}
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
                value={searchTerm}
                onChange={handleInputChange}
                className="indent-2 h-max w-full focus:outline-none"
                placeholder="search"
              />
            </div>
            {/* Filter by Date */}
            <SelectMenu
              text={reviewDate}
              list={reviewDatesList}
              changingAction={setReviewDate}
              filter={{ action: filterByTime }}
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
                {["5", "4", "3", "2", "1"].map((rating) => {
                  return (
                    ratingDistribution[parseInt(rating) - 1] !== 0 && (
                      <div
                        key={rating}
                        className={
                          "cursor-pointer py-px px-1 rounded " +
                          (filtersApplied.includes("rating")
                            ? "bg-zinc-300"
                            : "hover:bg-zinc-300")
                        }
                        onClick={() => {
                          filterByArgument("rating", rating);
                          handlePageChange(1);
                        }}
                      >
                        <RatingLine
                          rating={rating}
                          raters={ratingDistribution[rating - 1]}
                          totalRaters={filteredData.length}
                        />
                      </div>
                    )
                  );
                })}
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
                  "flex-col justify-start items-stretch w-10/12 ml-4 gap-1.5 " +
                  (openVersionFilter ? "flex" : "hidden")
                }
              >
                {Object.keys(versionDistribution).map((version) => {
                  return (
                    <div
                      key={version}
                      className={
                        "cursor-pointer py-px px-1 rounded " +
                        (filtersApplied.includes("version")
                          ? "bg-zinc-300"
                          : "hover:bg-zinc-300")
                      }
                      onClick={() => {
                        filterByArgument("version", version);
                        handlePageChange(1);
                      }}
                    >
                      <VersionLine
                        version={version}
                        occurence={versionDistribution[version]}
                      />
                    </div>
                  );
                })}
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
                {Object.keys(countryDistribution).map((country) => {
                  return (
                    <div
                      key={country}
                      className={
                        "cursor-pointer py-px px-1 rounded " +
                        (filtersApplied.includes("countryName")
                          ? "bg-zinc-300"
                          : "hover:bg-zinc-300")
                      }
                      onClick={() => {
                        filterByArgument("countryName", country);
                        handlePageChange(1);
                      }}
                    >
                      <CountryLine
                        country={country}
                        occurence={countryDistribution[country]}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {isFilterApplied && (
            <button
              onClick={() => {
                setIsFilterApplied(false);
                setFiltersApplied([]);
                setFilteredData(ApplicationsData);
              }}
              className="flex justify-center items-center gap-2 bg-gray-100 border border-zinc-300 rounded-md py-1 px-2"
            >
              <FcClearFilters />
              <b className="font-bold text-md">Clear Filters</b>
            </button>
          )}
        </div>
        <div id="newpage" className="absolute right-0 flex-2 w-9/12 h-screen">
          <div className="my-8 mx-3 flex flex-col justify-center items-center">
            <div className="flex justify-between items-center w-full mb-6">
              <p className="text-md font-semibold">
                Viewing {startIndex + 1}-
                {filteredData.length >= 10 ? endIndex : filteredData.length} of{" "}
                {filteredData.length} Reviews
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

            {/* Reviews */}
            <div className="flex flex-col justify-start items-stretch w-full gap-4">
              {paginatedData.map((review) => {
                return <Review key={review.id} review={review} />;
              })}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center my-2">
              {generatePaginationNumbers().map((pageNumber, index) => (
                <a
                  className="flex justify-center items-center mx-2"
                  key={pageNumber}
                  href="#newpage"
                >
                  <button
                    className={
                      "text-md " +
                      (pageNumber === currentPage
                        ? "font-bold"
                        : "font-regular")
                    }
                    key={index}
                    onClick={() => handlePageChange(pageNumber)}
                    disabled={
                      pageNumber === currentPage || pageNumber === "..."
                    }
                  >
                    {pageNumber}
                  </button>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
