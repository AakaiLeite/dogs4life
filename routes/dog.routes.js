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
router.get("/breeds", async (req, res) => {
  try {
    const allBreeds = await Dog.find();
    res.render("breed-find", { allBreeds });
  } catch (error) {
    console.log(error);
  }
});

router.get("/breed/:breedId", async (req, res) => {
  try {
    const { breedId } = req.params;
    const breed = await Dog.findById(breedId);
    console.log(breed);
    res.render("breed-details", breed);
  } catch (error) {
    console.log("Error Breed Details: ", error);
  }
});

module.exports = router;
