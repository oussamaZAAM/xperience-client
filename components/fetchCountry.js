import countryData from 'country-data';

export const fetchCountry = async (countryName) => {
  try {
    if (countryName === "US") {
      return `https://cdn.countryflags.com/thumbs/united-states-of-america/flag-400.png`;
    } else if (countryName === "UK") {
      return `https://cdn.countryflags.com/thumbs/united-kingdom/flag-400.png`;
    }
    return `https://cdn.countryflags.com/thumbs/${countryName.toLowerCase()}/flag-400.png`
    // var response;
    // if (country === "US") {
    //   response = await fetch(`https://restcountries.com/v2/name/usa`);
    // } else if (country === "UK") {
    //   response = await fetch(`https://restcountries.com/v2/name/united%20kingdom`);
    // } else if (country === "India") {
    //   response = await fetch(`https://restcountries.com/v2/name/Bhāra`);
    // } else {
    //   response = await fetch(`https://restcountries.com/v2/name/${country}`);
    // }
    // if (response.ok) {
    //   const body = await response.json();
    //   return body[0].flags.png;
    // } else {
    //   console.log("Error fetching flag");
    // }
  } catch (error) {
    console.log("Error fetching flag", error);
  }
};
