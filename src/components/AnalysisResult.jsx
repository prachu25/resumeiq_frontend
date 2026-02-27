import React from "react";
import ATSGauge from "./ATSGauge";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { MdLightbulbOutline } from "react-icons/md";

const AnalysisResult = ({ result }) => {

    if (!result || !Array.isArray(result) || result.length === 0) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <p className="text-red-500 text-lg">
                    No analysis data available.
                </p>
            </div>
        );
    }

    const data = result[0];

    const score = data?.score ?? 0;
    const matchedSkills = data?.matchedSkills ?? [];
    const missingSkills = data?.missingSkills ?? [];
    const suggestions = data?.suggestions ?? [];
    const createdAt = data?.createdAt ?? "";

    const getStatus = () => {
        if (score >= 80) return "Excellent Match";
        if (score >= 60) return "Good Match";
        if (score >= 40) return "Average Match";
        return "Needs Improvement";
    };

    const getStatusColor = () => {
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-yellow-500";
        if (score >= 40) return "text-orange-500";
        return "text-red-600";
    };
    return (
        <div className="w-full max-w-3xl mx-auto mt-8 p-6">

            {/* ===== SCORE SECTION ===== */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                    ResumeIQ Match Index
                </h2>

                <ATSGauge score={score} />

                <p className={`mt-2 text-sm font-semibold ${getStatusColor()}`}>
                    {getStatus()}
                </p>

                {createdAt && (
                    <p className="text-gray-400 mt-1 text-xs">
                        Analyzed on: {new Date(createdAt).toLocaleString()}
                    </p>
                )}
            </div>



            {/* ===== SKILLS SECTION ===== */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* Matched Skills */}
                <div className="p-5 rounded-xl border border-green-200 bg-green-50/40">

                    <div className="flex items-center gap-2 mb-4">
                        <FiCheckCircle className="text-green-600 text-lg" />
                        <h3 className="text-base font-semibold text-green-700">
                            Matched Skills
                        </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {matchedSkills.length === 0 ? (
                            <p className="text-gray-500 text-sm">
                                No matched skills found.
                            </p>
                        ) : (
                            matchedSkills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                                >
                                    {skill}
                                </span>
                            ))
                        )}
                    </div>

                </div>

                {/* Missing Skills */}
                <div className="p-5 rounded-xl border border-red-200 bg-red-50/40">

                    <div className="flex items-center gap-2 mb-4">
                        <FiXCircle className="text-red-600 text-lg" />
                        <h3 className="text-base font-semibold text-red-700">
                            Missing Skills
                        </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {missingSkills.length === 0 ? (
                            <p className="text-gray-500 text-sm">
                                No missing skills.
                            </p>
                        ) : (
                            missingSkills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium"
                                >
                                    {skill}
                                </span>
                            ))
                        )}
                    </div>

                </div>

            </div>
            {/* ===== SUGGESTIONS ===== */}
            <div className="mt-10">

                <div className="flex items-center gap-2 mb-5">
                    <MdLightbulbOutline className="text-indigo-600 text-lg" />
                    <h3 className="text-base font-semibold text-indigo-700">
                        Improvement Suggestions
                    </h3>
                </div>

                <div className="space-y-3">
                    {suggestions.length === 0 ? (
                        <p className="text-gray-500 text-sm">
                            No suggestions available.
                        </p>
                    ) : (
                        suggestions.map((s, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 p-4 rounded-xl border border-indigo-100 bg-indigo-50/40"
                            >
                                <MdLightbulbOutline className="text-indigo-600 text-lg" />
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {s}
                                </p>
                            </div>
                        ))
                    )}
                </div>

            </div>

        </div >
    );
};

export default AnalysisResult;