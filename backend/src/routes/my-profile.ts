import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Profile from "../models/profile";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { ProfileType } from "../shared/types";

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
      const existingProfile = await Profile.findOne({ userId: req.userId });

      if (existingProfile) {
        return res
          .status(400)
          .json({ message: "Profile already exists for this user" });
      }

      const imageFiles = req.files as Express.Multer.File[];
      const newProfile: ProfileType = req.body;

      const imageUrls = await uploadImages(imageFiles);
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

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({
      userId: req.userId,
    });

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

router.get("/has-pfp", verifyToken, async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({
      userId: req.userId,
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (!profile.imageUrls[0]) {
      // Throw a specific error when there is no profile picture
      return res.status(400).json({ message: "No profile picture found" });
    }

    res.json({ hasProfilePic: true });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile picture status" });
  }
});

router.put(
  "/",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedProfile: ProfileType = req.body;
      updatedProfile.lastUpdated = new Date();

      const profile = await Profile.findOneAndUpdate(
        {
          _id: req.body.profileId,
          userId: req.userId,
        },
        updatedProfile,
        { new: true }
      );

      if (!profile)
        return res.status(404).json({ message: "Profile not found" });

      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);

      profile.imageUrls = [
        ...updatedImageUrls,
        ...(updatedProfile.imageUrls || []),
      ];

      await profile.save();
      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;
