import express, { Request, Response } from "express";
import multer from "multer";
import verifyToken from "../middleware/auth";
import Log from "../models/log";
import { LogType } from "../shared/types";
import { body } from "express-validator";

const router = express.Router();
const upload = multer(); // configure multer as needed

router.post(
  "/",
  verifyToken,
  [
    body("date").notEmpty().withMessage("Date must be provided"),
    body("timeSpent").notEmpty().withMessage("Time spent must be provided"),
    body("splitDay").notEmpty().withMessage("Split day must be provided"),
    body("location").notEmpty().withMessage("Location must be provided"),
    body("exercises")
      .isArray({ min: 1 })
      .withMessage("Exercises must be an array with at least one item"),
    body("exercises.*.name")
      .notEmpty()
      .withMessage("Exercise name must be provided"),
    body("exercises.*.sets")
      .isArray({ min: 1 })
      .withMessage("Sets must be an array with at least one item"),
    body("exercises.*.sets.*.weight")
      .isNumeric()
      .withMessage("Weight must be a number"),
    body("exercises.*.sets.*.reps")
      .isNumeric()
      .withMessage("Reps must be a number"),
    body("exercises.*.sets.*.rpe")
      .isNumeric()
      .withMessage("RPE must be a number"),
    body("exercises.*.sets.*.toFailure")
      .isBoolean()
      .withMessage("To Failure must be a boolean"),
  ],
  upload.none(), // handle FormData without file uploads
  async (req: Request, res: Response) => {
    try {
      const newLog: LogType = req.body;

      newLog.lastUpdated = new Date();
      newLog.userId = req.userId;

      const log = new Log(newLog);
      await log.save();

      res.status(201).send(log);
    } catch (error) {
      console.log("Error creating log: ", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const logs = await Log.find({ userId: req.userId });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const id = req.params.id.toString();

    const log = await Log.findOne({ _id: id, userId: req.userId });
    res.json(log);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs" });
  }
});

router.put(
  "/:logId",
  verifyToken,
  upload.none(),
  async (req: Request, res: Response) => {
    try {
      const updatedLog: LogType = req.body;
      updatedLog.lastUpdated = new Date();

      const log = await Log.findOneAndUpdate(
        {
          _id: req.params.logId,
          userId: req.userId,
        },
        updatedLog,
        { new: true }
      );

      if (!log) return res.status(404).json({ message: "Log not found" });

      await log.save();
      res.status(201).json(log);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
