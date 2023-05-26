import Image from "next/image";
import React, { useEffect, useState } from "react";
import missing_flag from "@/public/icons/missing_flag.png";

const CountryLine = ({ country, occurence }) => {
  const [flag, setFlag] = useState(missing_flag);
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v2/name/${country}`
        );
        if (response.ok) {
          const body = await response.json();
          setFlag(body[0].flags.png);
        } else {
          console.log("Error fetching flag");
        }
      } catch (error) {
        console.log("Error fetching flag", error);
      }
    };
    fetchCountry();
  }, []);

  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-start items-center gap-2">
        <Image
          className="rounded"
          src={flag}
          height={28}
          width={28}
        />
        <p className="font-semibold text-left text-md">{country}</p>
      </div>
      <p className="font-regular text-sm text-zinc-400">{occurence}</p>
    </div>
  );
};

export default CountryLine;
