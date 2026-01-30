import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,

    date: { type: String, required: true },

    priority: {
      type: String,
      enum: ["Extreme", "Moderate", "Low"],
      required: true,
    },

    status: {
      type: String,
      enum: ["In Progress", "Not Started" , "Completed",],
      default: "In Progress",
    },

    image: { type: String },
    imagePublicId: { type: String }
  },
  { timestamps: true }
);

export default model("Task", taskSchema);
