export type SetType = {
  _id: string;
  weight: number;
  reps: number;
  rpe: number;
  toFailure: boolean;
};

export type ExerciseType = {
  _id: string;
  name: string;
  sets: SetType[];
};

export type LogType = {
  _id: string;
  userId: string;
  date: Date;
  timeSpent: number;
  splitDay: string;
  location: string;
  exercises: ExerciseType[];
  lastUpdated: Date;
};

export type ProfileType = {
  _id: string;
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
