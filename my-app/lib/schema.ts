import mongoose from "mongoose";
const ProjectSchema= new mongoose.Schema({
    // id:{
    //     type:Number,
    //     required:true,
    //     unique:true,
    // },
    projectName:{
        type:String,
        required:true,
        unique:false,
    },
    projectLink:{
        type:String,
        required:false,
        unique:false,
    },
    gitHubLink:{
        type:String,
        required:false,
        unique:false,
    },
    description:{
        type:String,
        required:true,
        unique:false,
    },
    image:{
        type:String || Object || Array,
        required:true,
        unique:false,
        
    },
    techStackImages:{
        type: Array,
        required:false,
        unique:false,
    }

},{collection:'Projects'});

const WorkExperienceSchema= new mongoose.Schema({
    position:{
        type:String,
        required:true,
        unique:false,
    },
    company:{
        type:String,
        required:true,
        unique:false,
    },
    duration:{
        type:String,
        required:false,
        unique:false,

    },
    description:{
        type:String,
        required:false,
        unique:false,
    },
},{collection:'WorkExperience'});



export const WorkExperience = mongoose.models.WorkExperience || mongoose.model("WorkExperience", WorkExperienceSchema);
export const Projects= mongoose.models.Projects|| mongoose.model("Projects", ProjectSchema);

