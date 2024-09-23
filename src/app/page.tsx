"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Job } from "../components/types";
import { JobCard } from "../components/JobCard";
import { Modal } from "../components/Modal";
import { AddressInput } from "../components/AddressInput";
import { Edit, Wallet, X } from "lucide-react";

const api = axios.create({
  baseURL: "https://backend.addressforge.xyz",
});

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Home() {
  const [pattern, setPattern] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);
  const [connectedAddress, setConnectedAddress] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const response = await api.post<Job>("/job", {
        pattern,
        deployer: address,
        owner: address,
      });

      const newJob: Job = {
        id: response.data.id,
        pattern,
        state: "created",
      };

      setJobs([newJob, ...jobs]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error submitting job:",
          error.response?.data || error.message
        );
      } else {
        console.error("Error submitting job:", error);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const updatedJobs = await Promise.all(
          jobs.map(async (job) => {
            try {
              const response = await api.get<Job>(`/job/${job.id}`);
              return response.data;
            } catch (error) {
              if (axios.isAxiosError(error)) {
                console.error(
                  "Error fetching job:",
                  error.response?.data || error.message
                );
              } else {
                console.error("Error fetching job:", error);
              }
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

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setConnectedAddress(accounts[0]);
          setAddress(accounts[0]);
        }
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      console.error(
        "Ethereum object not found, do you have MetaMask installed?"
      );
    }
  };

  const disconnectWallet = () => {
    setConnectedAddress("");
    setAddress("");
  };

  const handleAddressChange = (newAddress: string) => {
    setAddress(newAddress);
    if (newAddress === "") {
      disconnectWallet();
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-4 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl text-blue-400">addressforge</h1>
          <div className="flex items-center">
            {connectedAddress ? (
              <div className="flex items-center bg-blue-600 text-black p-2 rounded">
                <span>{truncateAddress(connectedAddress)}</span>
                <button
                  onClick={disconnectWallet}
                  className="ml-2 hover:text-gray-300 transition-colors"
                  title="Disconnect"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsConnectModalOpen(true)}
                className="bg-blue-600 text-black p-2 rounded hover:bg-blue-500 transition-colors flex items-center"
              >
                Connect
                <Edit className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleAddressChange(e.target.value)
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
              value={address}
              onChange={(e) => handleAddressChange(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-600 text-black p-2 rounded hover:bg-blue-500 transition-colors flex items-center justify-center w-full"
            onClick={() => {
              connectWallet();
              setIsConnectModalOpen(false);
            }}
          >
            Use Connected Wallet
            <Wallet className="ml-2 h-4 w-4" />
          </button>
        </Modal>
      </div>
    </div>
  );
}
