import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ATSGauge = ({ score }) => {

    const getColor = () => {
        if (score >= 80) return "#22c55e";   // Green
        if (score >= 60) return "#f59e0b";   // Orange
        return "#ef4444";                    // Red
    };

    return (
        <div className="w-40 mx-auto">
            <CircularProgressbar
                value={score}
                maxValue={100}
                text={`${score}%`}
                circleRatio={0.7}   // makes it semi circle style
                styles={buildStyles({
                    rotation: 0.65,   // position of semi circle
                    strokeLinecap: "round",
                    pathColor: getColor(),
                    trailColor: "#e5e7eb",
                    textColor: "#4f46e5",
                    textSize: "18px"
                })}
            />
        </div>
    );
};

export default ATSGauge;