import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, default: "MERN Stack Developer" },
    bio: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "Kathmandu, Nepal" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    avatarUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);