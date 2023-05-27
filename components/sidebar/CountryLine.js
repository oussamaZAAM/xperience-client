import missing_flag from "@/public/icons/missing_flag.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchCountry } from "../fetchCountry";

const CountryLine = ({ country, occurence }) => {
  const [flag, setFlag] = useState(missing_flag);
  useEffect(() => {
    fetchCountry(country)
      .then((flag) => setFlag(flag))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-start items-center gap-2">
        <Image
          className="rounded w-8 h-5 border"
          src={flag}
          height={75}
          width={75}
          alt={"Country: " + country}
        />
        <p className="font-semibold text-left text-md">{country}</p>
      </div>
      <p className="font-regular text-sm text-zinc-400">{occurence}</p>
    </div>
  );
};

export default CountryLine;
