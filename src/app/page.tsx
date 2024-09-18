"use client";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
} from "react";

interface Job {
  id: string;
  pattern: string;
  state: "created" | "running" | "done";
  address?: string;
}

const LoadingSpinner: React.FC = () => (
  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-400"></div>
);

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const [runtime, setRuntime] = useState<number>(0);

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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-blue-400"> Job_Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white">
            [X]
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

interface EthereumAddressInputProps {
  value: string;
  onChange: (value: string) => void;
  title: string;
}

const EthereumAddressInput: React.FC<EthereumAddressInputProps> = ({
  value,
  onChange,
  title,
}) => {
  const [addressChars, setAddressChars] = useState<(string | null)[]>(
    Array(40).fill(null)
  );
  const [placeholderAddress, setPlaceholderAddress] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    generateRandomPlaceholder();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [cursorPosition]);

  useEffect(() => {
    const a = addressChars.map((char) => char ?? "X");
    onChange(a.join(""));
  }, [addressChars, onChange]);

  const generateRandomPlaceholder = () => {
    const randomAddr = Array(40)
      .fill(0)
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");
    setPlaceholderAddress(randomAddr);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase().replace(/[^0-9a-fX]/g, "");
    const newPosition = e.target.selectionStart ?? 0;
    setAddressChars((prev) => {
      const newChars = [...prev];
      if (newPosition > cursorPosition) {
        newChars[cursorPosition] = inputValue[cursorPosition];
      } else if (newPosition < cursorPosition) {
        newChars[cursorPosition - 1] = null;
      }
      return newChars;
    });
    setCursorPosition(newPosition);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowLeft" && cursorPosition > 0) {
      e.preventDefault();
      setCursorPosition((prev) => prev - 1);
    } else if (e.key === "ArrowRight" && cursorPosition < 40) {
      e.preventDefault();
      setCursorPosition((prev) => prev + 1);
    }
  };

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    setCursorPosition(e.currentTarget.selectionStart ?? 0);
  };

  const displayValue = addressChars
    .map((char, index) => char || placeholderAddress[index])
    .join("");

  return (
    <div className="w-full">
      <label
        htmlFor="address"
        className="block text-gray-400 text-xs mb-1 bg-gray-900 p-1 rounded-t"
      >
        {title}
      </label>
      <div className="relative font-mono text-lg bg-gray-950 border border-gray-800 rounded-b">
        <input
          ref={inputRef}
          type="text"
          id="address"
          value={displayValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          className="w-full bg-transparent p-2 rounded-b focus:outline-none focus:ring-1 focus:ring-blue-500 text-transparent relative z-10 caret-blue-400"
          spellCheck="false"
        />
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-2 flex">
          {addressChars.map((char, index) => (
            <span
              key={index}
              className={char !== null ? "text-blue-400" : "text-gray-600"}
            >
              {char !== null ? char : placeholderAddress[index]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const JobSubmissionDashboard: React.FC = () => {
  const [pattern, setPattern] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3333/job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pattern,
          deployer: address,
          owner: address,
        }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      const newJob: Job = {
        id: json.id,
        pattern,
        state: "created",
      };

      setJobs([newJob, ...jobs]);
    } catch (error) {
      console.error("Error submitting job:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const updatedJobs = await Promise.all(
          jobs.map(async (job) => {
            try {
              const response = await fetch(
                `http://localhost:3333/job/${job.id}`
              );
              if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
              }
              const json = await response.json();
              console.log(json);
              return json as Job;
            } catch (error) {
              console.error("Error fetching job:", error);
              return job;
            }
          })
        );
        setJobs(updatedJobs);
      } catch (error) {
        console.error("Error updating jobs:", error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [jobs]);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-4 font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl mb-6 text-center text-blue-400">
          addressforge
        </h1>

        <div className="bg-gray-900 rounded p-4 mb-6">
          <h2 className="text-xl mb-4 text-blue-400"> forge new address</h2>
          <div className="flex flex-col gap-4">
            <EthereumAddressInput
              value={pattern}
              onChange={setPattern}
              title="Pattern"
            />
            <div className="w-full">
              <label
                htmlFor="deployerAddress"
                className="block text-gray-400 text-xs mb-1 bg-gray-900 p-1 rounded-t"
              >
                Deployer Address
              </label>
              <input
                id="deployerAddress"
                className="w-full p-2 bg-gray-950 border border-gray-800 rounded-b text-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={address}
                autoComplete="off"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAddress(e.target.value)
                }
              />
            </div>
            <button
              className="bg-blue-600 text-black p-2 rounded hover:bg-blue-500 transition-colors"
              onClick={handleSubmit}
            >
              Execute
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl mb-4 text-blue-400"> history</h2>
          <div className="bg-gray-900 rounded p-4 h-[calc(100vh-300px)] overflow-y-auto">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onClick={handleJobClick} />
            ))}
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {selectedJob ? (
            <pre className="text-sm text-blue-400 overflow-x-auto">
              {JSON.stringify(selectedJob, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-400">No job selected</p>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default function Home() {
  return <JobSubmissionDashboard />;
}
