//Requiring Packages
const express = require("express");
const router = express.Router();
const session = require("express-session");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

const DogApi = require("../services/api.services");
const dogApi = new DogApi();

const Dog = require("../models/Breed.model");
const User = require("../models/User.model");

// Routes
router.get("/search", async (req, res) => {
  try {
    const allBreeds = await Dog.find();
    console.log(allBreeds);
    res.render("breed-search", { allBreeds });
  } catch (error) {
    console.log(error);
  }
});

router.get("/breed-search-results", async (req, res) => {
  try {
    const { breed } = req.query;
    const searchedBreed = await Dog.find({}, { name: breed });
    console.log(searchedBreed);
    res.render("breed-search-results");
  } catch (error) {
    console.log("Error Getting Breeds: ", error);
  }
});

router.get("/breed/:breedId", async (req, res) => {
  try {
    const { breedId } = req.params;
    const breedDetails = await Dog.findById(breedId);
    console.log(breedDetails);
    res.render("breed-details", breedDetails);
  } catch (error) {
    console.log("Error Detail Breed: ", error);
  }
});

module.exports = router;
