import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type ProfileType = {
  userId: string;
  bodyweight: number;
  height: number;
  age: number;
  gender: string;
  yearsOE: number;
  goals: string;
  imageUrls: string[];
  lastUpdated: Date;
};

const profileSchema = new mongoose.Schema<ProfileType>({
  userId: {
    type: String,
    required: true,
  },
  bodyweight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  yearsOE: {
    type: Number,
  },
  goals: {
    type: String,
  },
  imageUrls: [
    {
      type: String,
    },
  ],
  lastUpdated: {
    type: Date,
    required: true,
  },
});

const Profile = mongoose.model<ProfileType>("Profile", profileSchema);

export default Profile;
