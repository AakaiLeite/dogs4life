//Requiring Packages
const express = require("express");
const router = express.Router();
const session = require("express-session");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

const Breed = require("../models/Breed.model");
const User = require("../models/User.model");

// GET Routes
router.get('/profile', isLoggedIn, (req, res) =>{
    res.render('/user/profile');
})

router.get('/breeds/favorites', (req, res) =>{
    res.render('/user/breed-favorites');
})

module.exports = router;