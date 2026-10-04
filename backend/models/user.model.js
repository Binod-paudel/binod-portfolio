import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

userSchema.methods.matchPassword = async function(password){
     return bcrypt.compare(password, this.password);
}

userSchema.pre("save", async function(next){
     if(!this.isModified("password")){
          next();
     }
     let salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema);
export default User;
