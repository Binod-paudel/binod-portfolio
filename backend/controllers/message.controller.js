import Message from "../models/message.model.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import ApiError from "../utils/ApiError.js";

const createMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    throw new ApiError(400, "All fields are required");
  }
  const created = await Message.create({ name, email, subject, message });
  res
    .status(201)
    .json({
      success: true,
      message: "Message sent successfully",
      data: created,
    });
});

const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: messages });
});

const updateMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true },
  );

  if(!message) throw new ApiError(404, "Message not found");
  res.status(200).json({ success: true, message: "Message marked as read", data: message });
});

const deleteMessage = asyncHandler(async(req, res)=>{
     const message = await Message.findByIdAndDelete(req.params.id);
     if(!message) throw new ApiError(404, "Message not found");
     res.status(200).json({ success: true, message: "Message deleted successfully" });
})

export {createMessage, getMessages, updateMessage, deleteMessage};
