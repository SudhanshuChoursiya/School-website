import mongoose from "mongoose";

const timeTableSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  standard: {
    type: String,
    required: true,
  },
  file_url: {
    type: String,
    required: true,
  },
  cloudinary_public_id: {
    type: String,
    required: true,
  },
});

export const timeTableModel = mongoose.model("timetable", timeTableSchema);
