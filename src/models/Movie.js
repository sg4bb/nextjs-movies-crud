import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please type a title"],
  },
  plot: {
    type: String,
    required: [true, "please type a plot"],
  },
});

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
