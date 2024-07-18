import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Profile, { ProfileType } from "../models/profile";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("bodyweight").isNumeric().withMessage("Bodyweight must be a number"),
    body("height").isNumeric().withMessage("Height must be a number"),
    body("age").isNumeric().withMessage("Age must be a number"),
    body("yearsOE")
      .isNumeric()
      .withMessage("Years of experience must be a number"),
  ],
  upload.array("imageFiles", 1),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newProfile: ProfileType = req.body;

      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });

      const imageUrls = await Promise.all(uploadPromises);
      newProfile.imageUrls = imageUrls;
      newProfile.lastUpdated = new Date();
      newProfile.userId = req.userId;

      const profile = new Profile(newProfile);
      await profile.save();

      res.status(201).send(profile);
    } catch (error) {
      console.log("Error creating profile: ", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
