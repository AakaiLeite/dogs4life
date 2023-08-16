const Breed = require("../models/Breed.model");

const DogApi = require("../services/api.services");
const dogApi = new DogApi();

const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://mikleite:UTj1xL3E1bEomanu@ironhack-webdev-bootcam.vmxtj0t.mongodb.net/Dogs4Life";

async function setImages() {
  await mongoose.connect(MONGO_URI);
  let allBreeds = await Breed.find();

  const breedsInterval = setInterval(async () => {
    if (allBreeds.length === 0) {
      clearInterval(breedsInterval);
    }
    let breed = allBreeds[0];

    console.log(breed.name);

    let breedImg = await dogApi.getBreedImage(breed.id);
    breedImg = breedImg.data[0].url;

    let updateBreed = await Breed.findByIdAndUpdate(breed._id, {
      $set: { image: breedImg }},
      { strict: false });

    console.log(updateBreed);

    allBreeds = allBreeds.slice(1, allBreeds.length - 1);
  }, 5000);
}

setImages();
