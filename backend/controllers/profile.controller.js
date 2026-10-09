import Profile from "../models/profile.model.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import ApiError from "../utils/ApiError.js";

//@desc get profile
//@route GET /api/v1/profile
//@access public

const getProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create({
      name: "Binod Paudel",
      title: "MERN Stack Developer",
      bio: "I am a passionate MERN Stack Developer with a strong foundation in web development. I enjoy creating dynamic and responsive web applications that provide seamless user experiences. With a keen eye for detail and a commitment to writing clean, efficient code, I strive to deliver high-quality solutions that meet client needs. I am constantly learning and staying up-to-date with the latest technologies to enhance my skills and contribute to innovative projects.",
      email: "binodpaudel@example.com",
      phone: "+977 9840333114",
      location: "Kathmandu, Nepal",
    });
  }
  res.status(200).json({
    success: true,
    data: profile,
  });
});

//@desc update profile
//@route PUT /api/v1/profile
//@access private
const updateProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) {
    throw new ApiError("Profile not found", 404);
  } else {
    Object.assign(profile, req.body);
    await profile.save();
  }

  res.json({
    success: true,
    message: "Profile updated successfully",
    profile,
  });
});

export { getProfile, updateProfile };
