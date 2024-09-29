import React from "react";
import { Job } from "@/components/types";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const calculateRuntime = (startTime: string, endTime: string): string => {
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  const durationMs = end - start;
  const seconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

export const HistoryCard = ({
  job,
  onClick,
}: {
  job: Job;
  onClick: () => void;
}) => (
  <div
    className="bg-gray-700 p-3 rounded-md mb-2 text-sm cursor-pointer"
    onClick={onClick}
  >
    <div className="flex justify-between items-center">
      <span className="text-blue-300">
        {new Date(job.createdAt).toLocaleString()}
      </span>
      <span
        className={`px-2 py-0.5 rounded ${
          job.state === "done" ? "bg-green-500" : "bg-yellow-500"
        } text-black text-xs`}
      >
        {job.state}
      </span>
    </div>
    <div className="text-blue-100 mt-1">
      {job.address ? job.address : "0x" + job.pattern}
    </div>
    <div className="mt-1 flex justify-between items-center">
      {job.state === "running" && (
        <div className="flex items-center">
          <LoadingSpinner />
          <span className="ml-2 text-blue-300">Running</span>
        </div>
      )}
      {job.state === "done" && job.finishedAt && (
        <span className="text-green-400">
          Runtime: {calculateRuntime(job.createdAt, job.finishedAt)}
        </span>
      )}
    </div>
  </div>
);
