//Requiring Packages
const express = require("express");
const router = express.Router();
const session = require("express-session");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

const Breed = require("../models/Breed.model");
const User = require("../models/User.model");

// Routes
router.get("/user/profile", isLoggedIn, (req, res) => {
  const currentUser = req.session.currentUser;
  res.render("user/profile", { currentUser });
});

router.get("/user/favorites", isLoggedIn, async (req, res) => {
  const currentUser = req.session.currentUser;
  try {
    const userFavorites = await User.findById(currentUser._id).populate(
      "favorites"
    );
    // missing something to do with populate
    res.render("user/favorites", { currentUser, userFavorites });
  } catch (error) {
    console.log("Error Favorites: ", error);
  }
});

router.post("user/favorites/add/:breedId", isLoggedIn, async (req, res) => {
  const currentUser = req.session.currentUser;
  try {
    const { breedId } = req.params;
    await User.findByIdAndUpdate(currentUser._id, {
      $push: { favorites: breedId },
    });
    res.redirect("/favorites");
    console.log(currentUser);
  } catch (error) {
    console.log("Error Setting Favorite: ", error);
  }
});

router.post("/user/favorites/remove/:breedId", isLoggedIn, async (req, res) => {
  const currentUser = req.session.currentUser;
  try {
    const { breedId } = req.params;
    await User.findByIdAndRemove(currentUser._id, {
      $pull: { favorites: breedId },
    });
    res.redirect("/favorites");
  } catch (error) {
    console.log("Error Setting Favorite: ", error);
  }
});

router.get("/user/comments", isLoggedIn, (req, res) => {
  const currentUser = req.session.currentUser;
  res.render("user/comments", { currentUser });
});

module.exports = router;
