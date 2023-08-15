//Requiring Packages
const express = require("express");
const router = express.Router();
const session = require("express-session");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

const DogApi = require("../services/api.services");
const dogApi = new DogApi();

const Breed = require("../models/Breed.model");
const User = require("../models/User.model");

// Routes
router.get("/breeds", async (req, res) => {
  try {
    const allBreeds = await Breed.find();
    res.render("breed-find", { allBreeds });
  } catch (error) {
    console.log(error);
  }
});

router.get("/breed/:breedId", async (req, res) => {
  try {
    const { breedId } = req.params;
    const breed = await Breed.findById(breedId);
    console.log(breed.id);
    let dogImg = await dogApi.getBreedImage(breed.id);
    dogImg = dogImg.data[0].url;

    res.render("breed-details", { breed: breed, image: dogImg });
  } catch (error) {
    console.log("Error Breed Details: ", error);
  }
});

module.exports = router;
