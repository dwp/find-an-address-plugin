const axios = require("axios");

const { apiKey } = require("./config");

const getAddressesSearchString = async (searchString) => {
  try {
    const { data } = await axios.get(
      `https://api.os.uk/search/places/v1/find?query=${searchString}&key=${apiKey}`,
    );
    const addresses = data.results.map((item) => item.DPA);
    return formatAddress(addresses) || [];
  } catch (error) {
    console.log("Ordnance Survey (OS) API error:", error.code);
    return [];
  }
};

const getAddressesPostcode = async (postcode) => {
  try {
    const { data } = await axios.get(
      `https://api.os.uk/search/places/v1/postcode?postcode=${postcode.replace(/\s/g, "")}&key=${apiKey}`,
    );
    const addresses = data.results.map((item) => item.DPA);
    return formatAddress(addresses) || [];
  } catch (error) {
    console.log("Ordnance Survey (OS) API error:", error.code);
    return [];
  }
};

function formatAddress(addresses) {
  return addresses.map((i) => {
    const buildingNames =
      i.ORGANISATION_NAME || i.SUB_BUILDING_NAME || i.BUILDING_NAME
        ? (i.ORGANISATION_NAME || "") +
          " " +
          (i.SUB_BUILDING_NAME || "") +
          " " +
          (i.BUILDING_NAME || "")
        : "";
    const numberStreet =
      i.BUILDING_NUMBER || i.THOROUGHFARE_NAME
        ? (i.BUILDING_NUMBER || "") + " " + (i.THOROUGHFARE_NAME || "")
        : "";
    const address = [
      buildingNames,
      numberStreet,
      i.POST_TOWN || "",
      i.POSTCODE || "",
    ];
    return (
      titleCase(
        address
          .filter((i) => i)
          .slice(0, -1)
          .join(", "),
      ) +
      ", " +
      (i.POSTCODE || "")
    );
  });
}

function titleCase(str) {
  return str
    .split(" ")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
    .join(" ");
}

module.exports = {
  getAddressesPostcode,
  getAddressesSearchString,
};
