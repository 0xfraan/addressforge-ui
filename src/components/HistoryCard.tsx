import { Job } from "@/components/types";

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
  </div>
);
