import Resume from "../models/Resume.js";


// controller for creating a new resume
// POST: /api/resumes/create
export const createResume = async(req, res) => {
    try {
        const userId = req.userId;
        const {title} = req.body;

        //create new resume
        const newResume = await Resume.create({
            userId,
            title
        })

        return res.status(200).json({message: 'Resume created successfully', resume: newResume})
    } catch(error) {
        return res.status(400).json(error.message)
    }
}

// controller for deleting a resume
// DELETE: /api/users/delete
export const deleteResume = async(req, res) => {
    try {
        const userId = req.userId;
        const {resumeId} = req.params;

        //create new resume
        const deletedResume = await Resume.findOneAndDelete({userId, _id: resumeId});

        return res.status(200).json({message: 'Resume deleted successfully'})
    } catch(error) {
        return res.status(400).json(error.message)
    }
}

// get user resume by id
// GET: /api/resumes/get
export const getUserResumeById = async(req, res) => {
    try {
        const userId = req.userId;
        const {resumeId} = req.params;

        //create new resume
        const resume = await Resume.findOne({userId, _id: resumeId});

        if(!resume) {
            return res.status(404).json({message: "Resume not found"})
        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res.status(200).json({resume})
    } catch(error) {
        return res.status(400).json(error.message)
    }
}