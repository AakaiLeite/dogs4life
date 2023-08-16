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
  const currentUser = req.session.currentUser;
  try {
    const allBreeds = await Breed.find();
    let dogImg = []
    allBreeds.forEach((breed) => {
      dogImg.push(breed.image);
    }) 
    res.render("breed-list", {
      allBreeds: allBreeds,
      image: dogImg,
      currentUser: currentUser,
    });
  } catch (error) {
    console.log("Error Listing Breeds: ", error);
  }
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

module.exports = router;
