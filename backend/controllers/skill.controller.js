import Skill from "../models/skill.model.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import ApiError from "../utils/ApiError.js";

const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ category: 1, name: 1 });
  res.json({ success: true, skills });
});

const createSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.create(req.body);
  res
    .status(201)
    .json({ success: true, message: "Skill created successfully", skill });
});

const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if(!skill){
     throw new ApiError(404, "Skill not found");
  }
  res.json({ success: true, message: "Skill updated successfully", skill });
});

const deleteSkill = asyncHandler(async(req, res)=>{
     const skill = await Skill.findByIdAndDelete(req.params.id);
     if(!skill){
        throw new ApiError(404, "Skill not found");
     }
     res.json({ success: true, message: "Skill deleted successfully" });
})

export { getSkills, createSkill, updateSkill, deleteSkill };
