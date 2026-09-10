import { useEffect, useState } from "react";
import { Plus, CloudUpload, PenLine, Pencil, Trash2 } from "lucide-react";
import { dummyResumeData } from "../assets/assets";

const Dashboard = () => {
  const [allResumes, setAllResumes] = useState([]);

  const loadResumeData = () => {
    setAllResumes(dummyResumeData);
  };

  useEffect(() => {
    loadResumeData();
  }, []);

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-[#f8f9fc]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-start gap-4">
          <button
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

          <button
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

        <div className="flex flex-wrap items-start gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                key={index}
                type="button"
                style={{
                  backgroundColor: `${baseColor}14`,
                  borderColor: `${baseColor}30`,
                  color: baseColor,
                }}
                className="relative w-[150px] h-[180px] rounded-[8px] border flex flex-col items-center justify-center gap-2 shadow-[0_10px_25px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-pointer outline-none group"
              >
                <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span
                    className="p-1 rounded hover:bg-white/60 transition-colors"
                    style={{ color: baseColor }}
                  >
                    <Trash2 size={14} />
                  </span>
                  <span
                    className="p-1 rounded hover:bg-white/60 transition-colors"
                    style={{ color: baseColor }}
                  >
                    <Pencil size={14} />
                  </span>
                </div>

                <PenLine size={22} strokeWidth={1.8} style={{ color: baseColor }} />
                <p className="text-[12px] leading-tight font-medium" style={{ color: baseColor }}>
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
    </div>
  );
};

export default Dashboard;
