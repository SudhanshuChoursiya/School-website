import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: {
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

export const noticeModel = mongoose.model("notice", noticeSchema);
