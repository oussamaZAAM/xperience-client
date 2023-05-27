export const fetchCountry = async (country) => {
  try {
    const response = await fetch(
      `https://restcountries.com/v2/name/${country}`
    );
    if (response.ok) {
      const body = await response.json();
      return (body[0].flags.png);
    } else {
      console.log("Error fetching flag");
    }
  } catch (error) {
    console.log("Error fetching flag", error);
  }
};
