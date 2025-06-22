import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    images: [
      {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    category: { type: String },
    location: { type: String },
    description: { type: String, required: true },
    rating: { type: Number, default: null },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
