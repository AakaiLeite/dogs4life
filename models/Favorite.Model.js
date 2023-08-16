const { Schema, model } = require("mongoose");

const favoriteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    breed: { type: Schema.Types.ObjectId, ref: "Breed" }
  },
  {
    timestamps: true
  }
);

const Favorite = model("Favorite", favoriteSchema);

module.exports = Favorite;
