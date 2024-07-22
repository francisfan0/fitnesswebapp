import mongoose from "mongoose";
import { ExerciseType, LogType, SetType } from "../shared/types";

const setSchema = new mongoose.Schema<SetType>({
  weight: { type: Number, required: true },
  reps: { type: Number, required: true },
  rir: { type: Number, required: true },
  toFailure: { type: Boolean, required: true },
});

const exerciseSchema = new mongoose.Schema<ExerciseType>({
  name: { type: String, required: true },
  sets: { type: [setSchema], required: true },
});

const logSchema = new mongoose.Schema<LogType>({
  userId: { type: String, required: true },
  date: { type: Date },
  timeSpent: { type: Number },
  splitDay: { type: String },
  location: { type: String },
  exercises: { type: [exerciseSchema], required: true },
  lastUpdated: { type: Date, required: true },
});

const Log = mongoose.model<LogType>("Log", logSchema);

export default Log;
