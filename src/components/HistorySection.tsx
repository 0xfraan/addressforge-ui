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
  <div className="bg-gray-800 p-4 rounded-2xl w-full font-mono border border-blue-500 shadow-[0_0_10px_#0000ff]">
    <div className="flex items-center justify-between mb-3">
      <span className="text-blue-400 text-sm font-bold flex items-center">
        <Clock size={16} className="mr-2" />
        HISTORY
      </span>
    </div>
    {!isConnected && <p className="text-blue-300">Connect to see history</p>}
    {isConnected && (
      <div className="h-86 w-full overflow-y-auto pr-2">
        {jobs.map((job) => (
          <HistoryCard key={job.id} job={job} onClick={() => onJobClick(job)} />
        ))}
      </div>
    )}
  </div>
);
