import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("connected to the DB successfully!");
  } catch (error) {
    console.log("error connecting to the DB", error.message);
  }
};
