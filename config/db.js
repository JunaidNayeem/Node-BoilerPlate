import mongoose from "mongoose";
mongoose.set("strictQuery", true);
export async function connection () {
  try {
    await mongoose.connect(
      process.env.MONGO
    );
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};