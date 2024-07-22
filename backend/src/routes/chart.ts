import express, { Request, Response } from "express";
import multer from "multer";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import Log from "../models/log";
import { LogType, ProfileType } from "../shared/types";
import User from "../models/user";
import Profile from "../models/profile";

const router = express.Router();
const upload = multer();

router.post(
  "/",
  verifyToken,
  upload.none(),
  async (req: Request, res: Response) => {
    try {
    } catch (error) {}
  }
);

export default router;
