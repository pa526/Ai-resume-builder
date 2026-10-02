import { useEffect, useState } from "react";
import {
  Plus,
  CloudUpload,
  PenLine,
  Pencil,
  Trash2,
  XIcon,
  UploadCloud,
  LoaderCircleIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from 'react-pdftotext';

const Dashboard = () => {

  const {user, token} = useSelector(state => state.auth)
  // console.log(token)

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loadResumeData = async () => {
    try {
      const {data} = await api.get('/api/users/resumes', {headers: {authorization: token}})
      setAllResumes(data.userResume)
    } catch(error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  };

  const createResume = async (event) => {
    try {
      event.preventDefault();
      const {data} = await api.post('/api/resumes/create', {title}, {headers: {Authorization: token}})
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);
      const {data} = await api.post('/api/ai/upload-resume', {title, resumeText}, {headers: {Authorization: token}})
      console.log(data)
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      console.log(error.message)
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const editTitle = async (event) => {
    try {
      event.preventDefault()
      const {data} = await api.put(`/api/resumes/update`, {resumeId: editResumeId, resumeData: {title}}, {headers: {Authorization: token}})
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? {...resume, title} : resume))
      setEditResumeId('') 
      setTitle('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message) 
    }
  }

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this resume?')

      if(confirm) {
        const {data} = await api.delete(`/api/resumes/delete/${resumeId}`, {headers: {Authorization: token}})
        setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    loadResumeData();
  }, []);

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-[#f8f9fc]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Create and Upload Buttons */}
        <div className="flex flex-wrap items-start gap-4">
          {/* Create Resume */}
          <button
            onClick={() => setShowCreateResume(true)}
            type="button"
            className="w-[130px] h-[172px] bg-white rounded-[8px] border border-dashed border-gray-300 flex flex-col items-center justify-center gap-3 shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_30px_rgba(99,102,241,0.18)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer outline-none"
          >
            <span className="w-10 h-10 rounded-full bg-[#6a7bff] flex items-center justify-center shadow-[0_4px_12px_rgba(106,123,255,0.45)]">
              <Plus size={20} strokeWidth={2.5} className="text-white" />
            </span>

            <span className="text-[12px] leading-tight font-medium text-[#55548a]">
              Create Resume
            </span>
          </button>

          {/* Upload Existing */}
          <button
            onClick={() => setShowUploadResume(true)}
            type="button"
            className="w-[130px] h-[172px] bg-white rounded-[8px] border border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 shadow-[0_10px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_30px_rgba(168,85,247,0.18)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer outline-none"
          >
            <span className="w-10 h-10 rounded-full bg-[#c084fc] flex items-center justify-center shadow-[0_4px_12px_rgba(192,132,252,0.45)]">
              <CloudUpload size={20} strokeWidth={2.2} className="text-white" />
            </span>

            <span className="text-[12px] leading-tight font-medium text-gray-500">
              Upload Existing
            </span>
          </button>
        </div>

        <hr className="my-6 border-gray-200 max-w-[280px]" />

        {/* Resume Cards */}
        <div className="flex flex-wrap items-start gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <button
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                key={index}
                type="button"
                style={{
                  backgroundColor: `${baseColor}14`,
                  borderColor: `${baseColor}30`,
                  color: baseColor,
                }}
                className="relative w-[150px] h-[180px] rounded-[8px] border flex flex-col items-center justify-center gap-2 shadow-[0_10px_25px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-pointer outline-none group"
              >
                {/* Edit and Delete Icons */}
                <div onClick={e => e.stopPropagation()} className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span
                    className="p-1 rounded hover:bg-white/60 transition-colors"
                    style={{ color: baseColor }}
                  >
                    <Trash2 size={14} onClick={() => deleteResume(resume._id)} />
                  </span>

                  <span
                    className="p-1 rounded hover:bg-white/60 transition-colors"
                    style={{ color: baseColor }}
                  >
                    <Pencil size={14} onClick={() => {setEditResumeId(resume._id); setTitle(resume.title);}}/>
                  </span>
                </div>

                <PenLine
                  size={22}
                  strokeWidth={1.8}
                  style={{ color: baseColor }}
                />

                <p
                  className="text-[12px] leading-tight font-medium"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>

                <p
                  className="absolute bottom-2 text-[9px] font-normal opacity-80"
                  style={{ color: baseColor }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Create Resume Modal */}
      {showCreateResume && (
        <div
          onClick={() => {
            setShowCreateResume(false);
            setTitle("");
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          <form
            onSubmit={createResume}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
          >
            {/* Close Icon */}
            <XIcon
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              onClick={() => {
                setShowCreateResume(false);
                setTitle("");
              }}
            />

            <h2 className="text-xl font-bold mb-4">Create a Resume</h2>

            {/* Resume Title */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter resume title"
              className="w-full px-4 py-2 mb-4 border border-slate-300 rounded focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none"
              required
            />

            {/* Create Button */}
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Create Resume
            </button>
          </form>
        </div>
      )}

      {showUploadResume && (
        <div
          onClick={() => {
            setShowUploadResume(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          <form
            onSubmit={uploadResume}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
          >
            {/* Close Icon */}
            <XIcon
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              onClick={() => {
                setShowUploadResume(false);
                setTitle("");
              }}
            />

            <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

            {/* Resume Title */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter resume title"
              className="w-full px-4 py-2 mb-4 border border-slate-300 rounded focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none"
              required
            />

            <div>
              <label htmlFor="resume-input" >
                Select resume file
                <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                  {resume ? (
                    <p className="text-green-700">{resume.name}</p>
                  ) : (
                    <>
                      <UploadCloud className="size-14 stroke-1"/>
                      <p>Upload resume</p>
                    </>
                  )}
                </div>
              </label>
              <input type="file" id="resume-input" accept=".pdf" hidden onChange={(e) => setResume(e.target.files[0])}/>
            </div>

            {/* Create Button */}
            <button
              disabled={isLoading}
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              {isLoading && <LoaderCircleIcon className="animate-spin size-4 text-white"/>}
              {isLoading ? 'Uploading...' : 'Upload Resume'}
            </button>
          </form>
        </div>
      )}

      {editResumeId && (
        <div
          onClick={() => {
            setEditResumeId('');
            setTitle("");
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          <form
            onSubmit={editTitle}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
          >
            {/* Close Icon */}
            <XIcon
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              onClick={() => {
                setEditResumeId('');
                setTitle("");
              }}
            />

            <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>

            {/* Resume Title */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter resume title"
              className="w-full px-4 py-2 mb-4 border border-slate-300 rounded focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none"
              required
            />

            {/* Create Button */}
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
