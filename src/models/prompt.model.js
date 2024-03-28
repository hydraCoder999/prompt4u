import mongoose from "mongoose";

const PromptSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    prompt: {
      type: String,
      required: [true, "Prompt is Required"],
    },
    tag: {
      type: String,
      required: [true, "Tag is Required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Prompt = mongoose.models.Prompt || mongoose.model("Prompt", PromptSchema);

export default Prompt;
