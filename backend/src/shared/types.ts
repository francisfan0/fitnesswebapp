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
