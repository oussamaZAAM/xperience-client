export const fetchCountry = async (countryName) => {
  try {
    if (countryName === "US") {
      return `https://cdn.countryflags.com/thumbs/united-states-of-america/flag-400.png`;
    } else if (countryName === "UK") {
      return `https://cdn.countryflags.com/thumbs/united-kingdom/flag-400.png`;
    }
    return `https://cdn.countryflags.com/thumbs/${countryName.toLowerCase()}/flag-400.png`;
  } catch (error) {
    console.log("Error fetching flag", error);
  }
};
