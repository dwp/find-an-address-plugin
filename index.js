// utils
const {
  getAddressesSearchString,
  getAddressesPostcode,
} = require("./utils/getData");

module.exports = (router) => {
  router.get("/dwp-find-an-address-plugin/start", (req, res) => {
    res.redirect("/dwp-find-an-address-plugin");
  });

  router.get("/dwp-find-an-address-plugin", (req, res) => {
    res.render("/dwp-find-an-address-plugin/index.njk");
  });

  router.post("/dwp-find-an-address-plugin", (req, res) => {
    const { searchString, postcode } = req.body;
    if (!postcode && !searchString) {
      res.render("/dwp-find-an-address-plugin/index.njk", {
        error: "Enter a postcode, the first line of an address, or both.",
      });
    } else {
      if (!postcode) {
        getAddressesSearchString(searchString).then((data) => {
          if (data.length > 0) {
            if (data.length == 1) {
              req.session.data.address = data;
              res.render("/dwp-find-an-address-plugin/confirm-address.njk", {
                addressData: data[0],
              });
            } else {
              req.session.data.results = data;
              req.session.data.postcode = postcode;
              res.render(
                "/dwp-find-an-address-plugin/address-select-multi.njk",
                {
                  addressData: data,
                },
              );
            }
          } else {
            res.render("/dwp-find-an-address-plugin/no-address.njk");
          }
        });
      }

      if (!searchString) {
        getAddressesPostcode(postcode).then((data) => {
          if (data.length > 0) {
            if (data.length == 1) {
              req.session.data.address = data;
              res.render("/dwp-find-an-address-plugin/confirm-address.njk", {
                addressData: data,
              });
            } else {
              req.session.data.results = data;
              req.session.data.postcode = postcode;
              res.render(
                "/dwp-find-an-address-plugin/address-select-multi.njk",
                {
                  addressData: data,
                },
              );
            }
          } else {
            res.render("/dwp-find-an-address-plugin/no-address.njk");
          }
        });
      }

      if (postcode && searchString) {
        getAddressesPostcode(postcode).then((data) => {
          if (data.length > 0) {
            const filteredAddresses = data.filter((item) => {
              if (item.indexOf(searchString.toUpperCase()) !== -1) {
                return item;
              }
            });
            if (filteredAddresses.length > 0) {
              if (filteredAddresses.length == 1) {
                req.session.data.address = filteredAddresses[0];
                req.session.data.results = filteredAddresses;
                res.render("/dwp-find-an-address-plugin/confirm-address.njk", {
                  addressData: filteredAddresses,
                });
              } else {
                req.session.data.results = filteredAddresses;
                req.session.data.postcode = postcode;
                req.session.data.searchString = searchString;
                res.render(
                  "/dwp-find-an-address-plugin/address-select-multi.njk",
                  {
                    addressData: filteredAddresses,
                  },
                );
              }
            } else {
              res.render("/dwp-find-an-address-plugin/no-address.njk");
            }
          } else {
            res.render("/dwp-find-an-address-plugin/no-address.njk");
          }
        });
      }
    }
  });

  router.post("/dwp-find-an-address-plugin/manual-entry", (req, res) => {
    const addressLine1 = req.body["address-line-1"];
    const addressLine2 = req.body["address-line-2"];
    const townCity = req.body["town-city"];
    const postcode = req.body["postcode"];

    const error = {
      addressLineError:
        addressLine1 == "" ? "Enter the first line of the address" : undefined,
      townOrCityError: townCity == "" ? "Enter the town or city" : undefined,
      postcodeError: postcode == "" ? "Enter the postcode" : undefined,
    };

    if (
      error.addressLineError ||
      error.townOrCityError ||
      error.postcodeError
    ) {
      res.render("/dwp-find-an-address-plugin/manual-entry.njk", { error });
    } else {
      res.render("/dwp-find-an-address-plugin/manual-confirm-address.njk", {
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        townCity: townCity,
        postcode: postcode,
      });
    }
  });

  router.get("/dwp-find-an-address-plugin//manual-entry", (req, res) => {
    res.render("/dwp-find-an-address-plugin/manual-entry.njk");
  });
};
