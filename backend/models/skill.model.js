import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  category: {
    type: String,
    enum: ["Frontend", "Backend", "Database", "Tools"],
    required: true,
  },
  level: {
     type: Number,
     min: 0,
     max: 100,
     default: 70
  }
},
{timestamps: true}
);

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
