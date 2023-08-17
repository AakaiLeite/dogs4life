//Requiring Packages
const express = require("express");
const router = express.Router();
const session = require("express-session");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

const Breed = require("../models/Breed.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");

// Profile Route (R-D)
// Read
router.get("/user/profile", isLoggedIn, (req, res) => {
  const currentUser = req.session.currentUser;
  res.render("user/profile", { currentUser });
});

// Delete
router.post("/user/profile/delete", isLoggedIn, async (req, res) => {
  try {
    const currentUser = req.session.currentUser;
    await User.findByIdAndDelete(currentUser._id);
    res.redirect("/logout");
  } catch (error) {
    console.log("Error Deleting Profile: ", error);
  }
});

// Favorites Routes (R-U-D)
// Read
router.get("/user/favorites", isLoggedIn, async (req, res) => {
  const currentUser = req.session.currentUser;
  try {
    const userFavorites = await User.findById(currentUser._id).populate(
      "favorites"
    );
    console.log(userFavorites.favorites);
    // missing something to do with populate?
    res.render("user/favorites", { currentUser, userFavorites });
  } catch (error) {
    console.log("Error Favorites: ", error);
  }
});

// Update - Should this be a Create?
router.post("/user/favorites/add/:breedId", isLoggedIn, async (req, res) => {
  const currentUser = req.session.currentUser;
  try {
    const { breedId } = req.params;
    await User.findByIdAndUpdate(currentUser._id, {
      $push: { favorites: breedId },
    });
    res.redirect("/user/favorites");
    console.log(currentUser);
  } catch (error) {
    console.log("Error Setting Favorite: ", error);
  }
});

// Delete
router.post("/user/favorites/remove/:breedId", isLoggedIn, async (req, res) => {
  const currentUser = req.session.currentUser;
  try {
    const { breedId } = req.params;
    await User.findByIdAndUpdate(currentUser._id, {
      $pull: { favorites: breedId },
    });
    res.redirect(`/breed/${breedId}`); // redirect isnt working
  } catch (error) {
    console.log("Error Setting Favorite: ", error);
  }
});

// Comments Routes (C-R-U-D)
// Read
router.get("/user/comments", isLoggedIn, async (req, res) => {
  const currentUser = req.session.currentUser;
  try {
    const userComments = await User.findById(currentUser._id).populate(
      "comments"
    );
    // missing something to do with populate
    res.render("user/comments", { currentUser });
  } catch (error) {
    console.log("Error Comments: ", error);
  }
});

// Create
router.post("/user/comments/add/:breedId", isLoggedIn, async (req, res) => {
  const currentUser = req.session.currentUser;
  const { breedId } = req.params;
  try {
    const { content } = req.body;
    let newComment = await Comment.create({ content });

    await Comment.findByIdAndUpdate(newComment._id, {
      $push: { author: currentUser._id },
    });

    await Comment.findByIdAndUpdate(newComment._id, {
      $push: { breedRelated: breedId },
    });

    await User.findByIdAndUpdate(currentUser._id, {
      $push: { comments: newComment._id },
    });

    await Breed.findByIdAndUpdate(breedId, {
      $push: { comments: newComment._id },
    });

    res.redirect(`/breed/${breedId}`);
    console.log(currentUser);
  } catch (error) {
    console.log("Error Setting Comment: ", error);
  }
});

// Update
router.post("user/comments/remove/:breedId", isLoggedIn, async (req, res) => {
  const currentUser = req.session.currentUser;
  try {
    const { breedId } = req.params;
    await User.findByIdAndUpdate(currentUser._id, {
      // what do we do here?
    });
    res.redirect("user/breeds/`${breedId}`"); // why isn't this coloring breedId?
    console.log(currentUser);
  } catch (error) {
    console.log("Error Setting Comment: ", error);
  }
});

// Delete
router.post(
  "/user/:breedId/comments/remove/:commentId",
  isLoggedIn,
  async (req, res) => {
    const currentUser = req.session.currentUser;
    const { commentId, breedId } = req.params;
    try {
      await Comment.findByIdAndRemove(commentId);

      await User.findByIdAndUpdate(currentUser._id, {
        // what do we do here?
        $pull: { comments: commentId },
      });

      await Breed.findByIdAndUpdate(breedId, {
        // what do we do here?
        $pull: { comments: commentId },
      });

      res.redirect(`/breed/${breedId}`); // why isn't this coloring breedId?
      console.log(currentUser);
    } catch (error) {
      console.log("Error Setting Comment: ", error);
    }
  }
);

module.exports = router;
