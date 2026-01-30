import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/Cloudinary";


const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => {
    return {
      folder: "tasks",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
    };
  },
});
export const upload = multer({ storage });
// src/middleware/upload.ts
// import multer from "multer";

// const storage = multer.diskStorage({
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// export const upload = multer({ storage });