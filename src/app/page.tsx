"use client";
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { JobCard } from "../components/JobCard";
import { Modal } from "../components/Modal";
import { AddressInput } from "../components/AddressInput";
import { Edit, Wallet, X } from "lucide-react";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { ChevronDown, Zap, Plug2, Clock } from "lucide-react";

const api = axios.create({
  baseURL: "https://backend.addressforge.xyz",
});

const WalletButton = () => {
  const { address, isConnected } = useAccount();

  const truncateAddress = (address?: `0x${string}`) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address, ensName }) => {
        return (
          <div>
            {isConnected ? (
              <button
                onClick={show}
                className="ml-2 hover:text-gray-300 transition-colors"
                title="Disconnect"
              >
                <div className="bg-blue-500 hover:bg-blue-600 text-black font-mono font-semibold py-2 px-4 rounded-md transition-colors shadow-[0_0_5px_#0000ff] flex items-center space-x-2">
                  <span>{ensName || truncateAddress(address)}</span>
                </div>
              </button>
            ) : (
              <button
                onClick={show}
                className="bg-blue-500 hover:bg-blue-600 text-black font-mono font-semibold py-2 px-4 rounded-md transition-colors shadow-[0_0_5px_#0000ff] flex items-center space-x-2"
              >
                CONNECT
              </button>
            )}
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default function Home() {
  // const [pattern, setPattern] = useState<string>("");
  // const [address, setAddress] = useState<string>("");
  // const [jobs, setJobs] = useState<Job[]>([]);
  // const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);

  // const handleSubmit = async () => {
  //   try {
  //     const response = await api.post<Job>("/job", {
  //       pattern,
  //       deployer: address,
  //       owner: address,
  //     });

  //     const newJob: Job = {
  //       id: response.data.id,
  //       pattern,
  //       state: "created",
  //     };

  //     setJobs([newJob, ...jobs]);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.error(
  //         "Error submitting job:",
  //         error.response?.data || error.message
  //       );
  //     } else {
  //       console.error("Error submitting job:", error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     try {
  //       const updatedJobs = await Promise.all(
  //         jobs.map(async (job) => {
  //           try {
  //             const response = await api.get<Job>(`/job/${job.id}`);
  //             return response.data;
  //           } catch (error) {
  //             if (axios.isAxiosError(error)) {
  //               console.error(
  //                 "Error fetching job:",
  //                 error.response?.data || error.message
  //               );
  //             } else {
  //               console.error("Error fetching job:", error);
  //             }
  //             return job;
  //           }
  //         })
  //       );
  //       setJobs(updatedJobs);
  //     } catch (error) {
  //       console.error("Error updating jobs:", error);
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [jobs]);

  // const handleJobClick = (job: Job) => {
  //   setSelectedJob(job);
  //   setIsModalOpen(true);
  // };

  // const truncateAddress = (address: string) => {
  //   return `${address.slice(0, 6)}...${address.slice(-4)}`;
  // };

  return (
    <>
      <DeployerAndPatternInput />

      {/* <div className="min-h-screen bg-gray-900 text-gray-300 p-4 font-mono">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl text-blue-400">addressforge</h1>
            <div className="flex items-center"></div>
          </div>

          <div className="bg-gray-900 rounded p-4 mb-6">
            <h2 className="text-xl mb-4 text-blue-400"> forge new address</h2>
            <div className="flex flex-col gap-4">
              <AddressInput
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

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Job Details"
          >
            {selectedJob ? (
              <pre className="text-sm text-blue-400 overflow-x-auto">
                {JSON.stringify(selectedJob, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-400">No job selected</p>
            )}
          </Modal>

          <Modal
            isOpen={isConnectModalOpen}
            onClose={() => setIsConnectModalOpen(false)}
            title="Connect Wallet"
          >
            <div className="mb-4">
              <label
                htmlFor="toAddress"
                className="block text-gray-400 text-xs mb-1"
              >
                To Address
              </label>
              <input
                id="toAddress"
                className="w-full p-2 bg-gray-950 border border-gray-800 rounded text-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Address or ENS"
              />
            </div>
          </Modal>
        </div>
      </div>
   > */}
    </>
  );
}
interface Job {
  id: string;
  owner: string;
  pattern: string;
  deployer: string;
  state: string;
  salt: string | null;
  address: string | null;
  createdAt: string;
  finishedAt: string | null;
}

const HistoryCard = ({ job, onClick }: { job: Job; onClick: () => void }) => (
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

const shortenAddress = (addr: string) => {
  if (addr.length < 10) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

const DeployerAndPatternInput = () => {
  const [address, setAddress] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [pattern, setPattern] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isJobDetailsDialogOpen, setIsJobDetailsDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { address: connectedAddress, isConnected } = useAccount();

  useEffect(() => {
    if (connectedAddress) setAddress(connectedAddress);
    if (!connectedAddress)
      setAddress("0x0000000000000000000000000000000000000000");
  }, [connectedAddress]);

  useEffect(() => {
    const fetchJobs = async () => {
      if (isConnected && connectedAddress) {
        try {
          const response = await axios.get(
            `https://backend.addressforge.xyz/jobs/${connectedAddress}`
          );

          const sortedList = response.data.sort((a: Job, b: Job) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });

          setJobs(sortedList);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      }
    };

    fetchJobs();
    const interval = setInterval(fetchJobs, 5000);

    return () => clearInterval(interval);
  }, [isConnected, connectedAddress]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post<Job>(
        "https://backend.addressforge.xyz/job",
        {
          pattern,
          deployer: address,
          owner: address,
        }
      );

      const newJob: Job = {
        id: "0000000-00000-0000",
        pattern,
        state: "sent",
        createdAt: new Date().toISOString(),
        owner: address,
        deployer: address,
        salt: null,
        address: null,
        finishedAt: null,
      };
      setJobs([newJob, ...jobs]);
    } catch (error) {
      console.error("Error submitting job:", error);
    }
  };

  const handleEditSubmit = () => {
    if (editAddress) {
      setAddress(editAddress);
      setIsAddressDialogOpen(false);
    }
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsJobDetailsDialogOpen(true);
  };

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <header className="container mx-auto flex justify-between items-center mb-8">
        <h1 className="text-blue-400 text-2xl font-mono">addressforge</h1>
        <WalletButton />
      </header>

      <div className="flex flex-col items-center space-y-6 max-w-[28.5rem] mx-auto">
        <div className="bg-gray-800 p-6 rounded-2xl space-y-6 w-full font-mono border border-blue-500 shadow-[0_0_10px_#0000ff]">
          <div className="flex items-center justify-between">
            <span className="text-blue-400 text-sm font-bold">DEPLOYER:</span>
            <button
              onClick={() => setIsAddressDialogOpen(true)}
              className="bg-gray-700 text-blue-300 text-sm font-medium py-2 px-4 rounded-md flex items-center space-x-2 hover:bg-gray-600 transition-colors border border-blue-500 shadow-[0_0_5px_#0000ff]"
            >
              <span className={glitchEffect ? "glitch" : ""}>
                {shortenAddress(address)}
              </span>
              <ChevronDown size={16} />
            </button>
          </div>

          <div>
            <AddressInput
              value={pattern}
              onChange={setPattern}
              title="Pattern"
            />
          </div>

          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-black font-bold py-3 rounded-md transition-colors shadow-[0_0_10px_#0000ff]"
            onClick={handleSubmit}
          >
            EXECUTE
          </button>
        </div>

        <div className="bg-gray-800 p-4 rounded-2xl w-full font-mono border border-blue-500 shadow-[0_0_10px_#0000ff]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-blue-400 text-sm font-bold flex items-center">
              <Clock size={16} className="mr-2" />
              HISTORY
            </span>
          </div>
          {!isConnected && (
            <p className="text-blue-300">Connect to see history</p>
          )}
          {isConnected && (
            <div className="h-86 w-full overflow-y-auto pr-2">
              {jobs.map((job) => (
                <HistoryCard
                  key={job.id}
                  job={job}
                  onClick={() => handleJobClick(job)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {isAddressDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg border border-blue-500">
            <h2 className="text-blue-400 font-mono text-lg mb-4">
              Edit Deployer Address
            </h2>
            <input
              type="text"
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
              placeholder="Enter new address"
              className="w-full bg-gray-700 text-blue-300 border border-blue-500 focus:border-blue-400 placeholder-gray-500 font-mono rounded-md p-2 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddressDialogOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-black font-bold px-4 py-2 rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {isJobDetailsDialogOpen && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg border border-blue-500">
            <h2 className="text-blue-400 font-mono text-lg mb-4">
              Job Details
            </h2>
            <div className="text-blue-300 space-y-2">
              <p>
                <strong>ID:</strong> {selectedJob.id}
              </p>
              <p>
                <strong>Pattern:</strong> {selectedJob.pattern}
              </p>
              <p>
                <strong>State:</strong> {selectedJob.state}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedJob.createdAt).toLocaleString()}
              </p>
              {selectedJob.address && (
                <p>
                  <strong>Address:</strong> {selectedJob.address}
                </p>
              )}
              {selectedJob.salt && (
                <p>
                  <strong>Salt:</strong> {selectedJob.salt}
                </p>
              )}
              {selectedJob.finishedAt && (
                <p>
                  <strong>Finished At:</strong>{" "}
                  {new Date(selectedJob.finishedAt).toLocaleString()}
                </p>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsJobDetailsDialogOpen(false)}
                className="bg-blue-500 hover:bg-blue-600 text-black font-bold px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
