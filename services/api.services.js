const axios = require("axios");

class DogApi {
  constructor() {
    this.api = axios.create({
      baseURL: "https://api.thedogapi.com/v1/",
      headers: {
        "X-Api-Key":
          "live_Ee8fEG8GRRsQy8j15Zfs2dLTdmjjcCBoJYiCBAUBD1D9tIEIM1QxGsZuAkMWRMtH",
      },
    });
  }

  // API Actions
  getBreedImage = (breedId) => {
    return this.api.get("images/search?breed_ids=" + breedId);
  };
}

module.exports = DogApi;
