import React, { useState, useCallback } from "react";
import { Job } from "@/components/types";
import { X } from "lucide-react";

interface JobDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

const calculateRuntime = (
  startTime: string,
  endTime?: string | null
): string => {
  if (!endTime) return "In progress";

  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  const durationMs = end - start;

  const seconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

export const JobDetails: React.FC<JobDetailsProps> = ({
  isOpen,
  onClose,
  job,
}) => {
  const [copiedSalt, setCopiedSalt] = useState(false);

  const copySaltToClipboard = useCallback(() => {
    if (job?.salt) {
      navigator.clipboard.writeText(job.salt).then(() => {
        setCopiedSalt(true);
        setTimeout(() => setCopiedSalt(false), 2000);
      });
    }
  }, [job?.salt]);

  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center font-mono p-4">
      <div className="bg-gray-800 p-4 sm:p-6 rounded-lg border border-blue-500 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-blue-400 font-mono text-lg sm:text-xl">
            Job Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        <div className="text-blue-300 space-y-2 text-sm sm:text-base">
          <p>
            <strong>State:</strong> {job.state}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(job.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Runtime:</strong>{" "}
            {calculateRuntime(job.createdAt, job.finishedAt)}
          </p>
          {job.address && (
            <p className="break-all">
              <strong>Address:</strong> {job.address}
            </p>
          )}
          {job.salt && (
            <div className="flex flex-col sm:flex-row sm:items-center">
              <p className="break-all flex-grow">
                <strong>Salt:</strong> {job.salt}
              </p>
              <button
                onClick={copySaltToClipboard}
                className={`mt-2 sm:mt-0 sm:ml-2 px-2 py-1 text-xs rounded whitespace-nowrap ${
                  copiedSalt
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-black hover:bg-blue-600"
                } transition-colors duration-200`}
              >
                {copiedSalt ? "Copied!" : "Copy"}
              </button>
            </div>
          )}
         
        </div>
      </div>
    </div>
  );
};
