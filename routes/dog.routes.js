//Requiring Packages
const express = require("express");
const router = express.Router();
const session = require("express-session");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

const Breed = require("../models/Breed.model");
const User = require("../models/User.model");

// GET Routes
router.get("/breeds", (req, res) => {
  res.render("breed-list");
});

router.get("/breeds/details", (req, res) => {
  res.render("breed-details");
});

router.get("/breeds/details/testemonial", (req, res) => {
  res.render("breed-testemonials");
});

module.exports = router;
