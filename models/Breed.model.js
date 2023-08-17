const { Schema, model } = require("mongoose");

const breed = new Schema({
  weight: {
    imperial: String,
    metric: String,
  },
  height: {
    imperial: String,
    metric: String,
  },
  id: Number,
  name: String,
  bred_for: String,
  breed_group: String,
  life_span: String,
  temperament: String,
  origin: String,
  ref_img_id: String,
  image: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const DogBreed = model("Breed", breed);

module.exports = DogBreed;
