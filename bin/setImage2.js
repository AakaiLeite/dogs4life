const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://mikleite:UTj1xL3E1bEomanu@ironhack-webdev-bootcam.vmxtj0t.mongodb.net/Dogs4Life";

const Breed = require("../models/Breed.model");

const DogApi = require("../services/api.services");
const dogApi = new DogApi();

async function setImages() {
  await mongoose.connect(MONGO_URI);
  let allBreeds = await Breed.find();
  for (let i = 0; i < allBreeds.length; i++) {
    const breed = allBreeds[i];
    const fetchTimeout = setTimeout(async () => {
      const image = await dogApi.getBreedImage(breed.id);
      console.log(image.data[0].url);
    }, 1000);
    clearTimeout(fetchTimeout)
  }
}

setImages();
