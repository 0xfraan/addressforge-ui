import React from "react";
import { Clock } from "lucide-react";
import { HistoryCard } from "./HistoryCard";
import { Job } from "@/components/types";

interface HistorySectionProps {
  isConnected: boolean;
  jobs: Job[];
  onJobClick: (job: Job) => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({
  isConnected,
  jobs,
  onJobClick,
}) => (
  <div className="bg-gray-800 rounded-2xl w-full font-mono border border-blue-500 shadow-[0_0_10px_#0000ff] overflow-hidden">
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-blue-400 text-sm font-bold flex items-center">
          <Clock size={16} className="mr-2" />
          HISTORY
        </span>
      </div>
      {!isConnected && (
        <p className="text-blue-300 h-[25rem] flex items-center justify-center">
          Connect to see history
        </p>
      )}
      {isConnected && jobs.length === 0 && (
          <p className="text-blue-300 h-[25rem] flex items-center justify-center">
            No history
          </p>
        )}
    </div>
    {isConnected && jobs.length>0 && (
      <div className="max-h-[25rem] overflow-y-auto">
          <div className="px-4 pb-4">
            {jobs.map((job) => (
              <HistoryCard
                key={job.id}
                job={job}
                onClick={() => onJobClick(job)}
              />
            ))}
          </div>
      </div>
    )}
    
  </div>
);
