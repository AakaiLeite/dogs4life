//Requiring Packages
const express = require("express");
const router = express.Router();
const session = require("express-session");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

const Breed = require("../models/Breed.model");
const User = require("../models/User.model");
const Favorite = require("../models/Favorite.Model");

// GET Routes
router.get("/profile", isLoggedIn, (req, res) => {
  const currentUser = req.session.currentUser;
  res.render("user/profile", { currentUser });
});

// favorites routes
router.get("/favorites", async (req, res) => {
  const currentUser = req.session.currentUser;
  try {
    const user = await User.findById(currentUser._id).populate(
      "favoriteBreeds"
    );
    const favoriteBreeds = user.favoriteBreeds;

    res.render("user/favorites", { currentUser, favoriteBreeds });
  } catch (error) {
    console.log("Error fetching favorite breeds:", error);
  }
});

// Add a breed to favorites
router.post("/favorites/add/:breedId", isLoggedIn, async (req, res) => {
  try {
    const currentUser = req.session.currentUser;
    const breedId = req.params.breedId;
    const user = await UserModel.findById(currentUser._id);

    // Check if the breed is already in favorites
    if (!user.favoriteBreeds.includes(breedId)) {
      user.favoriteBreeds.push(breedId);
      await user.save();

      // Create a new Favorite record
      await FavoriteModel.create({ user: user._id, breed: breedId });

      res.redirect("/user/favorites");
    } else {
      res.redirect("/user/favorites");
    }
  } catch (error) {
    console.log("Error adding breed to favorites:", error);
  }
});

// update favorist list
router.get("/favorites", async (req, res) => {
  const currentUser = req.session.currentUser;
  try {
    const user = await User.findById(currentUser._id).populate(
      "favoriteBreeds"
    );
    const favoriteBreeds = user.favoriteBreeds;

    res.render("user/favorites", { currentUser, favoriteBreeds });
  } catch (error) {
    console.log("Error fetching favorite breeds:", error);
  }
});

// remove breed from favorites
router.post("/favorites/remove/:breedId", isLoggedIn, async (req, res) => {
  try {
    const currentUser = req.session.currentUser;
    const breedId = req.params.breedId;
    const user = await User.findById(currentUser._id);

    // Find the index of the breed in favorites
    const index = user.favoriteBreeds.indexOf(breedId);
    if (index !== -1) {
      user.favoriteBreeds.splice(index, 1);
      await user.save();

      // Delete the corresponding Favorite record
      await Favorite.findOneAndDelete({ user: user._id, breed: breedId });

      res.redirect("/user/favorites");
    } else {
      res.redirect("/user/favorites");
    }
  } catch (error) {
    console.log("Error removing breed from favorites:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
