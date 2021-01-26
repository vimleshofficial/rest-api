import mongoose from "mongoose";

const ListSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    trim: true,
  },
});

export default mongoose.model("List", ListSchema);
