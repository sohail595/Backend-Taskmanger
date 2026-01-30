import dotenv from "dotenv";
dotenv.config();
import "./config/Cloudinary";
import app from "./app";
import mongoose from "mongoose";


const PORT = 5000;

async function startServer() {
  try {
    await mongoose.connect(
      "mongodb+srv://mobsmith92_db_user:BoNtUEnhFXaowput@cluster0.h3vnvfw.mongodb.net/taskmanager"
    );

    console.log("DB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
  }
}

startServer();
