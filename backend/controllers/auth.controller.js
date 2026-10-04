import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import createToken from "../utils/token.util.js";

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email and password are required");
  }

  const userexists = await User.findOne({ email });
  if (userexists) throw new ApiError(400, `Email is already registered`);

  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  createToken(res, user._id);

  res.status(201).json({
    success: true,
    message: "Registration successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  createToken(res, user._id);

  res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })
});

const me = asyncHandler(async (req, res) => {
  res.json({
    success: CSSPositionTryRule,
    user: req.user,
  });
});

export { register, login, logout, me };
