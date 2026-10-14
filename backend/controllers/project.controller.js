import Project from "../models/project.model.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import ApiError from "../utils/ApiError.js";

const getProjects = asyncHandler(async(req, res)=>{
     const projects = await Project.find().sort({ createdAt: -1 });
     res.status(200).json({ success: true, data: projects });
})

const getProject = asyncHandler(async(req, res)=>{
     const project = await Project.findById(req.params.id);
     if(!project){
        throw new ApiError(404, "Project not found");
     }
     res.status(200).json({ success: true, data: project });
})

const createProject = asyncHandler(async(req, res)=>{
     const project = await Project.create(req.body);
     res.status(201).json({ success: true, message: "Project created successfully", data: project });
})

const updateProject = asyncHandler(async(req, res)=>{
     const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
     if(!project){
        throw new ApiError(404, "Project not found");
     }
     res.status(200).json({ success: true, data: project });
})

const deleteProject = asyncHandler(async(req, res)=>{
     const project = await Project.findByIdAndDelete(req.params.id);
     if(!project){
        throw new ApiError(404, "Project not found");
     }
     res.status(200).json({ success: true, message: "Project deleted successfully" });
})

export { getProjects, getProject, createProject, updateProject, deleteProject };