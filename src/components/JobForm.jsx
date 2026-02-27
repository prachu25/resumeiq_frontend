import React, { useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import AnalysisResult from "./AnalysisResult";
import scanAnimation from "../assets/scan-animation.json";
import { BASE_URL } from "../services/api";
import { useNavigate } from "react-router-dom";

const JobForm = () => {

    const navigate = useNavigate();

    const [company, setCompany] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleAnalyze = async () => {

        setError("");

        const userId = localStorage.getItem("userId");

        if (!userId) {
            navigate("/");
            return;
        }

        if (!file || !jobDescription) {
            setError("Please upload resume and enter job description.");
            return;
        }

        try {
            setLoading(true);
            setResult(null);

            const steps = [
                "Processing Resume...",
                "Analyzing Skills...",
                "Matching Job Description...",
                "Finalizing Analysis..."
            ];

            let index = 0;
            setStatusText(steps[index]);

            const textInterval = setInterval(() => {
                index++;
                if (index < steps.length) {
                    setStatusText(steps[index]);
                }
            }, 2000);

            const startTime = Date.now();

            // ===== RESUME UPLOAD =====
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("file", file);

            const resumeRes = await axios.post(
                `${BASE_URL}/resume/upload`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            const resumeId = resumeRes.data.id;

            // ===== JOB CREATE =====
            const jobRes = await axios.post(
                `${BASE_URL}/jobs/create`,
                jobDescription,
                { headers: { "Content-Type": "application/json" } }
            );

            const jobId = jobRes.data.id;

            // ===== RUN ANALYSIS =====
            const analysisRes = await axios.post(
                `${BASE_URL}/analysis/run?resumeId=${resumeId}&jobId=${jobId}`
            );

            const minTime = 8000;
            const elapsed = Date.now() - startTime;
            const remaining = minTime - elapsed;

            setTimeout(() => {
                clearInterval(textInterval);
                setStatusText("Analysis Completed");

                const responseData = analysisRes.data;

                setResult(
                    Array.isArray(responseData)
                        ? responseData
                        : [responseData]
                );

                setLoading(false);
            }, remaining > 0 ? remaining : 0);

        } catch (err) {
            console.error(err);
            setLoading(false);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-indigo-300 flex flex-col items-center px-4">

            {/* ================= FORM ================= */}
            {!loading && !result && (
                <div className="w-full max-w-3xl p-8 mt-3">

                    <h1 className="text-3xl font-bold text-center mb-2">
                        Smart <span className="text-indigo-600">Feedback</span> for your dream job
                    </h1>

                    <p className="text-gray-500 text-center mb-8">
                        Drop your resume for an ATS score and improvement tips
                    </p>

                    <div className="mb-4">
                        <label>Company Name</label>
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full mt-2 p-3 rounded-xl bg-white/40 focus:outline-none"
                            placeholder="Company Name"
                        />
                    </div>

                    <div className="mb-4">
                        <label>Job Title</label>
                        <input
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="w-full mt-2 p-3 rounded-xl bg-white/40 focus:outline-none"
                            placeholder="Job Title"
                        />
                    </div>

                    <div className="mb-4">
                        <label>Job Description</label>
                        <textarea
                            rows="3"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            className="w-full mt-2 p-3 rounded-xl bg-white/40 focus:outline-none"
                            placeholder="Description"
                        />
                    </div>

                    <div className="mb-6">
                        <label>Upload Resume (PDF)</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="w-full mt-2 p-3 rounded-xl bg-white/40 focus:outline-none text-gray-600"
                        />
                    </div>

                    {error && (
                        <p className="text-red-600 text-sm mb-4 text-center">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleAnalyze}
                        className="w-full py-3 text-white font-semibold rounded-xl 
                        bg-gradient-to-r from-indigo-700 to-purple-500 
                        hover:from-indigo-800 hover:to-purple-600 
                        transition duration-200 active:scale-95"
                    >
                        Analyze Resume
                    </button>

                </div>
            )}

            {/* ================= LOADING ================= */}
            {loading && (
                <div className="flex flex-col items-center mt-10">
                    <div className="w-[600px]">
                        <Lottie animationData={scanAnimation} loop />
                    </div>
                    <p className="mt-4 text-indigo-700 font-semibold">
                        {statusText}
                    </p>
                </div>
            )}

            {/* ================= RESULT ================= */}
            {result && !loading && (
                <AnalysisResult result={result} />
            )}

        </div>
    );
};

export default JobForm;