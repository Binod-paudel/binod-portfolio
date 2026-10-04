import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";

const checkAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new ApiError(401, "You must be logged in");
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);
    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (e) {
    throw new ApiError(401, "Invalid or expired Token");
  }
});

const checkAdmin = asyncHandler(async (req, res, next) => {
  if (req.user?.role == "admin") {
    next();
  } else {
    throw new ApiError(403, "You are not authorized to perform this operation");
  }
});

export { checkAuth, checkAdmin };
