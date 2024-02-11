import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = async (req, res, next) => {
  try {
    const file = req.file;
    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "files",
        allowed_formats: ["pdf", "docx"],
        public_id: `${Date.now()}_${req.file.originalname}`,
        unique_filename: true,
      });

      req.resultData = result;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

const removeFromCloudinary = async (req, res, next) => {
  try {
    const publicId = req.params.public_id;

    const result = await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    });

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "unexpected error occured" });
  }
};

export { uploadToCloudinary, removeFromCloudinary };
