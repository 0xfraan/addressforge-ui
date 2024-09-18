"use client";
import React, { useState, useEffect } from "react";
import { Job } from "./types";
import { LoadingSpinner } from "./LoadingSpinner";

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
}

export const JobCard = ({ job, onClick }: JobCardProps) => {
  const [runtime, setRuntime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (job.state === "running" || job.state === "created") {
      interval = setInterval(() => {
        setRuntime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [job.state]);

  return (
    <div
      className="bg-gray-950 border border-gray-800 rounded p-3 mb-3 cursor-pointer hover:bg-gray-900 transition-colors"
      onClick={() => onClick(job)}
    >
      <div className="font-mono text-sm flex justify-between items-center">
        <div>
          <p className="text-blue-400">ID: {job.id}</p>
          <p className="text-gray-400 truncate">Pattern: {job.pattern}</p>
          {job.state === "done" && job.address && (
            <p className="text-green-400">Address: {job.address}</p>
          )}
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end mb-1">
            {(job.state === "running" || job.state === "created") && (
              <LoadingSpinner />
            )}
            <span
              className={`ml-2 ${
                job.state === "done" ? "text-green-400" : "text-yellow-400"
              }`}
            >
              {job.state.charAt(0).toUpperCase() + job.state.slice(1)}
            </span>
          </div>
          <p className="text-gray-400">Runtime: {runtime}s</p>
        </div>
      </div>
    </div>
  );
};
