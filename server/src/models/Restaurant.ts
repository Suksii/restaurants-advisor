import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: { type: [String], required: true },
    category: { type: String },
    location: { type: String },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
