'use server'
import mongoose from "mongoose";
import { Projects } from "../schema";
import { WorkExperience } from "../schema";

let isConnected = false;
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const connection = async () => {
  const url = process.env.MONGODB_URI;
  if (isConnected) {
    console.log("MongoDB already connected");
    return Promise.resolve();
  }
  return mongoose.connect(url?.toString()!)
    .then(() => {
      isConnected = true;
      console.log('MongoDB Connected');
    })
    .catch((err) => {
      console.error('MongoDB Connection Error', err.message);
      throw err;
    });
}

// POST Project
export const postProject = async ({ projectName, description,projectLink, image ,techStackImages,gitHubLink}: { projectName: string; description: string; projectLink?:any ; image?: string , techStackImages?: Array<string>, gitHubLink?:string}) => {
  await connection();
  try {
    const newProject = new Projects({ projectName, description,projectLink, image,techStackImages,gitHubLink });
    await newProject.save();
    return {
        _id: newProject._id.toString(),
        name: newProject.projectName,
        description: newProject.description,
        link: newProject.projectLink,
        imageUrl: newProject.image,
      };
    // return parseStringify(newProject);
  } catch (error) {
    console.error('Error posting project:', error);
    throw error;
  }
};

// POST WorkExperience
export const postWorkExperience = async ({ position, company, duration, description }: { position: string; company: string; duration: String; description: string }) => {
  await connection();
  try {
    const newWorkExperience = new WorkExperience({ position, company, duration, description });
    await newWorkExperience.save();
    return parseStringify(newWorkExperience);
  } catch (error) {
    console.error('Error posting work experience:', error);
    throw error;
  }
};

// GET Projects
export const getProjects = async () => {
  await connection();
  try {
    const projects = await Projects.find().sort({ createdAt: -1 });
    return parseStringify(projects);
  } catch (error) {
    console.error('Error getting projects:', error);
    throw error;
  }
};

// GET WorkExperience
export const getWorkExperience = async () => {
  await connection();
  try {
    const workExperiences = await WorkExperience.find().sort({ createdAt: -1 });
    return parseStringify(workExperiences);
  } catch (error) {
    console.error('Error getting work experience:', error);
    throw error;
  }
};

export const getPassKey=()=>{
  return process.env.ADMIN_PASSKEY
}
export const getUploadKey=()=>{

  return process.env.UPLOAD;

}
// export const ADMIN_PASSKEY= process.env.ADMIN_PASSKEY
// export const UPLOAD=