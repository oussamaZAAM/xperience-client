import SmallSelectMenu from "@/components/SmallSelectMenu";
import CountryLine from "@/components/sidebar/CountryLine";
import RatingLine from "@/components/sidebar/RatingLine";
import SelectMenu from "@/components/sidebar/SelectMenu";
import VersionLine from "@/components/sidebar/VersionLine";

import { FaDownload } from "react-icons/fa";
import { FcClearFilters } from "react-icons/fc";
import { FiDelete, FiSearch } from "react-icons/fi";
import { MdArrowDropDown, MdRssFeed } from "react-icons/md";
import { TbBellFilled, TbBraces } from "react-icons/tb";

import Review from "@/components/Review";
import { useEffect, useState } from "react";
import { HiPlusSm } from "react-icons/hi";

import { stringToDate } from "@/components/generalMethods";
import Head from "next/head";
import Image from "next/image";
import { ApplicationsData } from "../public/review";
const itemsPerPage = 10;
const maxPaginationNumbers = 5;

const index = () => {
  // ----------------------------- Search bar -----------------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedData, setSearchedData] = useState(ApplicationsData);

  const handleInputChange = (value) => {
    const searchTerm = value;
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

  // ------------------------ Filtered Data --------------------------------
  const [filteredData, setFilteredData] = useState(ApplicationsData);
  const [filtersApplied, setFiltersApplied] = useState([]);
  const [filteredDataByApp, setFilteredDataByApp] = useState(ApplicationsData);
  const [filteredDataByTime, setFilteredDataByTime] =
    useState(ApplicationsData);

    // Common Data (between searched data and filtered data)
  const commonData = filteredData.filter(
    (review) =>
      searchedData.includes(review) &&
      filteredDataByApp.includes(review) &&
      filteredDataByTime.includes(review)
  );

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

  // ----------------------------- Select Menus -----------------------------
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

  // ------------------------- Filters Distribution -----------------------------
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

  // --------------------------- Filters ----------------------------
  const [openRatingFilter, setOpenRatingFilter] = useState(true);
  const [openVersionFilter, setOpenVersionFilter] = useState(true);
  const [openCountryFilter, setOpenCountryFilter] = useState(true);

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

    handlePageChange(1);
  };

  const filterByTime = (value) => {
    var filteredListByApp;

    const currentDate = new Date();
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const millisecondsInMonth = millisecondsInDay * 30;
    const millisecondsInYear = millisecondsInDay * 365;

    if (value === "all time") {
      setFilteredDataByTime(ApplicationsData);
    } else if (value === "1 year ago") {
      filteredListByApp = ApplicationsData.filter(
        (review) =>
          currentDate.getTime() - stringToDate(review.reviewDate).getTime() <=
          millisecondsInYear
      );
      setFilteredDataByTime(filteredListByApp);
    } else if (value === "1 month ago") {
      filteredListByApp = ApplicationsData.filter(
        (review) =>
          currentDate.getTime() - stringToDate(review.reviewDate).getTime() <=
          millisecondsInMonth
      );
      setFilteredDataByTime(filteredListByApp);
    } else if (value === "1 day ago") {
      filteredListByApp = ApplicationsData.filter(
        (review) =>
          currentDate.getTime() - stringToDate(review.reviewDate).getTime() <=
          6 * millisecondsInDay
      );
      setFilteredDataByTime(filteredListByApp);
    }

    handlePageChange(1);
  };

  const filterByArgument = (argument, value) => {
    const filteredList = filteredData.filter(
      (review) => review[argument] === value
    );
    setFilteredData(filteredList);
    setFiltersApplied([...filtersApplied, argument]);

    handlePageChange(1);
  };

  // --------------------------- Sorting Algorithms ---------------------------
  useEffect(() => {
    if (sortingBy === "Newest First") {
      setFilteredData((prev) => {
        const newData = [...prev]; // Create a new copy of the array
        return newData.sort(
          (a, b) => stringToDate(b.reviewDate) - stringToDate(a.reviewDate)
        );
      });
    } else if (sortingBy === "Oldest First") {
      setFilteredData((prev) => {
        const newData = [...prev]; // Create a new copy of the array
        return newData.sort(
          (a, b) => stringToDate(a.reviewDate) - stringToDate(b.reviewDate)
        );
      });
    }
  }, [sortingBy]);

  return (
    <>
      <Head>
        <title>Reviews</title>
        <link
          rel="icon"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAh1BMVEX////yZSryZCfyYiT5vKbyYSH5vqjyXx35tJvyXhvyYiLyZSf/+fbxWxX6zr36wq3+8Or1i2L1hVn4tJv/+/n2mHT828/+8+/0gVPxWAb4sJX839T97ef708T0gVT1iV/zbDP2k23zcj33q43xVAD1j2fzdUHzbzj95Nr6ybf3poj0fEf71snbZKYfAAAKqUlEQVR4nO1d22LaOhCM5TrGAVNIaAhQcmlPLm3z/993sCHgi1bakdaXB81jD+gwWaPxjlfD1VVAQEBAQEBAQEBAQEBAQEBAQEBAwACY3Asscj8RWKQj7J9vZ96LrJfPc4HP0gnmG5U9/PRcZPGQqc1IKc6fVRQlj35VXD8lUaTGWcX95kAwirJbnyoubrNiEZWNkGJZwQLJw9p5kfVjclxkhFXc38TRCdnTwnGRxVP2tUg8HRnF+VRFZ6SPbhTXD8llETUuivsojipIn1wu1PUyqy4Sj+lCnacqqiF1EI3FQ1pfROWjobh/jqMGklu0iutl2lxkNNvNfKOan+2w3YBVPAh9e5GRSP9ZJhpVfESquL5NdIuMoor7XEsQk/6KTNQR3wxOkaggVsWaTDSqGA1McT9tbTIXpEzpXyyJCpZVHJZiTeg1FFnSb6hgWcUhL1SNTDSraL9QNTLRqOJw282c2mQqFK2isfhnITigaBg2mQsSS9df9oNWisNUca8T+jayR1MVF4+GTaZCcYh+kVXBAskDXUVC6DUU+6/iPrVsMhfQ0k8KfRu994sfEZsg3fWv/zEreKT40SvD1Tf7PnqBXjTWJqFvQmXXq14ZXl19M4t9g6JGNFr9oJGg+t4zv4Iiby89oi0aVqGvEdxc90/w6upaARSb/aK2HyQJTgeoYAHou1i3illCfyaYD0TwUMUbpIoV0TgZv0yCapBL9IhvCVLFs2icjV8WwXSwCha4brpsJnz1i4DQF83TgBUs8C1GKJb9oqUfbBIctIIFrhHRKKQfE/p84AoWwKT/9uMR0cF+ZWJ+R1BEqqi4LUn54g1BcPKnC4L7Tf5b/18g6UdeSlVwu+mi6z/0gyqlqpgBn5tPkBL6u0R10C+Wxq/KqCoiusglGBObzLb4KHEiTPHU0auMqqI4RZVQFTxKsLBVfDZ+VUpVEblH5RBMqQp+3WOIWsVV4zcn5nkg0bATpPrByeUvKWgV14xflW71r7r+T44i2Q9uq/f6YlbxvL5TKlI0xKpokInGH0KEYss2pEUDkX4TQVLob5qvlKiixvilq4jchtMEqX5w297NBJ71a41fuopIM0URzKgK6hTJu4qE8UuLhvfdDdkPTvRLe1rFc+o2UmWUaHheqGQ/SBD0HC3a0842LRpe0q8yqoL0TZOHaMxNRpPKCYo+0s8Res27UkeKlie8KqEuVGfRIIV+Yjb1HLcb7SBQbV2RfrG6IFPoNe90kX7G80GVUKLh9F0k+8GW0Gvei1eR9YRXZdR2g1jFX4tRQm/8Dp7fjX4XmU94BftF0vid8O4iwCpWJn5tn4uqInh3Qws9dyFE+ld/+H6RyqkqQtJPCv0d/yutpn+4D1F/PuTAZyOrCIgGKfRb5GrPjWMfNcxeENfWX/pJmZhAT2F/AM/BZ7wxl9PnSz2l39APIk/vltBZltkP5EKlqsiTfpkKZkgFC6xukQvVxyqmhR75DqZYBQvMXpAqulvFZuOXi/yHw3Gr2RJ5zEdKv+WrZDN+eUiWOL+C4iskGk5Wsd345SB/cTwwB4kGbRUbthu3frCJ5MV5XGp2KyL9pFVMPuHdIjKRv3oceVy9QE+kQavYIBP8/2uUojJRxwwafMGsYr7xa0LmU8GSIiQaiFWMGL8Ggn4VLLB6EpH+1tZIGr93kNC/CsxkCkl/4+5GJZjxq4eT0GsovkpIf/1CxY1fHRKJCpYUl9L9oovx24az0GsoCveLgwu9hiIk/aTJeKqiq/FbR453EyasfohIf3kD5278VuEp9G3MkH4xIkXjcBX6GL8XeAu9hiImGqRVHHsZv2eCMjLRoAiNZpPPF8kKQrO4y04OX4D9IlFFIqMHIigk9DqK0IA9EhWEyYSU0GsoPkGiQVRRA8z4ld9kKhRFpL+F7oxfB4pYv8i7ULs0fnGsRKziGradGr8OFEWs4gq6Nn5xyPSLZ2wH6AetFEWs4hNA47enU5YyVnGJfoxfB4qYVUxXcbh+0IbVC3ChRulfYpm/0NG3fr6DJ6yXQKejFFXECTIgFi9dQ9JcCEJtBmX8XnmfJe4MzKiHE0HjCVBoqtgvsBAAO+qhJEgZvydAU8WmAApBCJ8AhaaKe6kiFPXAOQEKjRZhCWJuBMGoB8aS8CnUToFFPTBPgHoHUAhi1k3Uw3hEA4t6AMI6vAIoBNFh1AMWQNFVFWWiHvb6f3YOoBCETNTDZCMxVeyTVUxCRugnqcxUMTewEAAW9RAbng+SVrFDAIUkQZGoh6PxS1rFQ0q/jNB/Gb/0U2JENESlH8x0sk78ek8Vl8CziknIZDpVrXvPqeITzIGFAGSEvj4IJBNAISQamNCTE7/NiSFytKh36cdkgj/x6zxVXINAFY0Zvy2CyMSvTACFt/SvRaL/iKM95IEiSDT8pB+TCbPQa94gEkCR+oiGjEzQg0AyZ4k9pF/G+DUNAskEUDj3izLGr3nilx4Qg0TDTfpljF/bxK9MAIWTVSzUD1pvUWQCKBykXyb6jzPxS0t/p1axjPHLG0IQOYWK9osyGb/cJ7wDiIaM8csfBKK3G0T6AdH4+Q+ZRKAqiAwCyQRQZG/cKq6sv+pQ/WwSE78iARRx9MkfZdhxKZL9IDRlEUn0i8n7js3vgM93FkXfqIcaRT+rOH4Hfz9zx8mN8I96qC7mZRXHEVTBAp+/rBSNxi8OnwCK+M3hF1B3tt93kIl6qC7oLP1x7vTDCTtzFWWCAupLOkr/zRt8iR7xafoxJ5moh+aiTtlT8Y3zj/R+0DtqBxUsl3WwiuNfjhUs8EnpokzUg25h2CqOn71+Znmnz6STiXrQUwSlP372qGABrWjIRD2QFBGrOP7l/UPZGtGQiXqgKQJWcTz1rGCB+2YVZU6AmsC2imNXmWhQrN/A8TJ+vcC1iuNMhGBD+mWiHmwUWdIvVMEC95cdVSbqwU6RYRXHU+9N5oJzvygT9cChaA2g8BL6Nk79okzUA4+ixSr2FPo2dtMbL+PXgaIxgMJb6Ns4iIZM1ANAkQqgmCoBoW9jl1LPB6F7UeSldL94I17BAp8SQq/ekBeTnUYHFaSBRT28LrCzxPbzi50DjnqQCaDoDw5RDzIBFL0RdIl6ED6F2i1Bt6iHGZQ9ZTmFOh6C1TO8MgEUPRB0j3qYvUKDOkgAhSC8oh6w7CkggEIQkG3YTgTqKIBCkqBvplMnARRyWAlEPYBZxb/7/cXjD/5TYjrqYYX8FGI87emI7BcIq1gHOuoBkP4O+kEbGM8XjzBFPbADKDrpB22wPl88whz1wJR+EeMXR8sq1sEW9cASDacnvBK4t1fRnunECCwUM35xWJ4SF0JvX8TaLwoavzjuzTsqL9PJIv2ixi8O42gRN9PJKBrCxi8Ow2gRP/rP0C/Cg0DyKK1iHZBMJ7KKAwh9G4RoYNF/RGDhIELfhnZADM100vaLcTfGLw5NFfFMJ430Dyb0bdw3q+gS3tiS/jgfSQULNKTfLeO3If2DCn0btdEi14zfmlUcR6O5RI+oSL97xm9FNMCJ3z5wln6fjN+z9I9A6Ns49Yt+4Y2nKjpM/PaBsuv3zfgtpX9EMlHHQTT8M35nT7njxG8f2L0LhDfOXobuJkz4LvHH/+DGSwUEBAQEBAQEBAQEBAQEsPE/YTrF8DgVrV4AAAAASUVORK5CYII="
        />
      </Head>
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
          <div className="fixed h-full w-3/12 flex-1 flex flex-col items-center justify-start p-2.5 gap-2 border-r-2 border-zinc-300">
            <div className="flex flex-col items-stretch justify-center gap-2 w-11/12 mt-3">
              {/* Search bar */}
              <div className="flex items-center justify-between rounded-md border-2 border-zinc-300 py-2 px-3 textinput">
                <div className="flex justify-start items-center">
                  <FiSearch size={24} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="indent-2 h-max w-full focus:outline-none font-bold"
                    placeholder="search"
                  />
                </div>
                <FiDelete
                  className="cursor-pointer"
                  onClick={() => handleInputChange("")}
                  size={20}
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
                        onClick={() => filterByArgument("version", version)}
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
                        onClick={() => filterByArgument("countryName", country)}
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
            {filtersApplied.length !== 0 && (
              <button
                onClick={() => {
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
            {commonData.length !== 0 ? (
              <div className="my-8 mx-3 flex flex-col justify-center items-center">
                <div className="flex justify-between items-center w-full mb-6">
                  <p className="text-md font-semibold">
                    Viewing {startIndex + 1}-
                    {commonData.length >= 10 ? endIndex : commonData.length} of{" "}
                    {commonData.length} Reviews
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
            ) : (
              <div className="flex flex-col justify-center items-center h-full">
                <Image
                  className="w-48 h-48"
                  src={require("../public/icons/empty.png")}
                  width={256}
                  height={256}
                />
                <b className="font-black font-mono text-xl text-center">
                  No reviews here!
                </b>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
