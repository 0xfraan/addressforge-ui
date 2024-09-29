import { Job } from "@/components/types";

interface JobDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

export const JobDetails: React.FC<JobDetailsProps> = ({
  isOpen,
  onClose,
  job,
}) =>
  isOpen && job ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg border border-blue-500">
        <h2 className="text-blue-400 font-mono text-lg mb-4">Job Details</h2>
        <div className="text-blue-300 space-y-2">
          <p>
            <strong>ID:</strong> {job.id}
          </p>
          <p>
            <strong>Pattern:</strong> {job.pattern}
          </p>
          <p>
            <strong>State:</strong> {job.state}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(job.createdAt).toLocaleString()}
          </p>
          {job.address && (
            <p>
              <strong>Address:</strong> {job.address}
            </p>
          )}
          {job.salt && (
            <p>
              <strong>Salt:</strong> {job.salt}
            </p>
          )}
          {job.finishedAt && (
            <p>
              <strong>Finished At:</strong>{" "}
              {new Date(job.finishedAt).toLocaleString()}
            </p>
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-black font-bold px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
