import express, { Request, Response } from "express";
import multer from "multer";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import Groq from "groq-sdk";
import Log from "../models/log";
import { LogType, ProfileType } from "../shared/types";
import User from "../models/user";
import Profile from "../models/profile";

const router = express.Router();
const upload = multer();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post(
  "/",
  verifyToken,
  upload.none(),
  async (req: Request, res: Response) => {
    try {
      // const id = req.body.logId;
      // const log = await Log.findOne({ _id: id, userId: req.userId });

      // if (!log) {
      //   return res.status(404).json({ message: "Log not found" });
      // }

      // const chatCompletion = await getGroqChatCompletion(
      //   log,
      //   req.body.additionalInput
      // );

      // // Check if chatCompletion is defined and has the expected structure
      // const messageContent =
      //   chatCompletion?.choices?.[0]?.message?.content ||
      //   "No content available";

      // res.status(200).json({ message: messageContent });
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const now = new Date();
      const lastResponseDate = user.lastChatRequestDate;
      const isSameDay =
        lastResponseDate &&
        now.getUTCFullYear() === lastResponseDate.getUTCFullYear() &&
        now.getUTCMonth() === lastResponseDate.getUTCMonth() &&
        now.getUTCDate() === lastResponseDate.getUTCDate();

      if (isSameDay && user.lastChatRequest) {
        return res.status(200).json({
          message:
            "Due to lack of current resources, we are only able to provide one response per day at this time. Here is your latest response. " +
            user.lastChatRequest,
        });
      }

      // Check if it's a new day and update timestamps
      if (!isSameDay) {
        user.lastChatRequestDate = now;
        user.lastChatRequest = ""; // Allow new request today
      }

      // Update last request timestamp
      user.lastChatRequestDate = now;
      await user.save();

      const id = req.body.logId;
      const log = await Log.findOne({ _id: id, userId: req.userId });

      const profile = await Profile.findOne({
        userId: req.userId,
      });

      if (!log) {
        return res.status(404).json({ message: "Log not found" });
      }
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      const chatCompletion = await getGroqChatCompletion(
        log,
        req.body.additionalInput,
        profile
      );

      const messageContent =
        chatCompletion?.choices?.[0]?.message?.content ||
        "No content available";

      // Save the response and timestamp
      user.lastChatRequest = messageContent;
      await user.save();

      res.status(200).json({ message: messageContent });
    } catch (error) {
      console.error("Error fetching Groq chat completion:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export async function getGroqChatCompletion(
  log: LogType,
  additionalInput: string,
  profile: ProfileType
) {
  // Construct the profile information part conditionally
  const profileInfo = `
  ${
    profile.bodyweight !== undefined && profile.bodyweight !== 0
      ? `- Bodyweight: ${profile.bodyweight} lb`
      : ""
  }
  ${
    profile.height !== undefined && profile.height !== 0
      ? `- Height: ${profile.height} in`
      : ""
  }
  ${profile.age !== undefined ? `- Age: ${profile.age} years` : ""}
  ${profile.gender ? `- Gender: ${profile.gender}` : ""}
  ${
    profile.yearsOE !== undefined
      ? `- Years of Experience: ${profile.yearsOE}`
      : ""
  }
  ${profile.goals ? `- Goals: ${profile.goals}` : ""}
`;

  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
          I have a workout log with the following details:
          - Split Day: ${log.splitDay}
          - Location: ${log.location}
          - Time Spent: ${log.timeSpent} minutes
          - Exercises: ${log.exercises
            .map(
              (exercise) =>
                `${exercise.name} with ${
                  exercise.sets.length
                } sets and ${exercise.sets
                  .map(
                    (set) =>
                      `${set.weight} lbs with ${set.reps} reps and ${set.rir} reps in reserve and ${set.toFailure} to failure`
                  )
                  .join(", ")}`
            )
            .join(", ")}

          Additional input about this specific workout: ${additionalInput}

          ${profileInfo}

          Based on this information, could you provide insights or advice related to this workout log and the additional input provided? 
          Specifically, I am interested in understanding the effectiveness of the workout, any improvements or adjustments that could be made. Make it pretty concise with some science-based lifting advice.
        `,
      },
    ],
    model: "llama3-8b-8192",
  });
}

export default router;
