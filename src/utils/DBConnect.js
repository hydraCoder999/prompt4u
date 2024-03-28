import mongoose from "mongoose";

let isConnected = false;

const DBConnection = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Mongo DB is Alrady Connected");
    return;
  }
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      dbName: "prompt4u",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;

    console.log("MongoDB Connected ");
  } catch (error) {
    console.log("DB CONNECTION ERR!!");
  }
};

export default DBConnection;
