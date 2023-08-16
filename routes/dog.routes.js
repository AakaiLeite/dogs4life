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
router.get("/breeds", (req, res) => {
  res.render("breed-list");
});

router.get("/breeds/search", async (req, res) => {
  const currentUser = req.session.currentUser;
  try {
    const allBreeds = await Breed.find();
    res.render("breed-find", {
      allBreeds: allBreeds,
      currentUser: currentUser,
    });
  } catch (error) {
    console.log("Erro Breed Find: ", error);
  }
});

router.get("/breed/:breedId", async (req, res) => {
  const currentUser = req.session.currentUser;
  try {
    const { breedId } = req.params;
    const breed = await Breed.findById(breedId);
    let dogImg = await dogApi.getBreedImage(breed.id);
    dogImg = dogImg.data[0].url;

    res.render("breed-details", {
      breed: breed,
      image: dogImg,
      currentUser: currentUser,
    });
  } catch (error) {
    console.log("Error Breed Details: ", error);
  }
});

router.get("/trending", (req, res) => {
  const currentUser = req.session.currentUser;
  res.render("breed-trending", { currentUser });
});

module.exports = router;
