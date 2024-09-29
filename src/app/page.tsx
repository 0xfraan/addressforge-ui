"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddressInput } from "../components/AddressInput";
import { AddressDialog } from "@/components/AddressDialog";
import { useAccount } from "wagmi";
import { WalletButton } from "@/components/WalletButton";
import { DeployerSection } from "@/components/DeployerSection";
import { HistorySection } from "@/components/HistorySection";
import { JobDetails } from "@/components/JobDetails";
import { Job } from "@/components/types";
import { GetGolem } from "@/components/GetGolem";

const api = axios.create({
  baseURL: "https://backend.addressforge.xyz",
});

export default function Home() {
  const [address, setAddress] = useState<string>("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [pattern, setPattern] = useState<string>("");
  const [editAddress, setEditAddress] = useState<string>("");
  const [glitchEffect, setGlitchEffect] = useState<boolean>(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] =
    useState<boolean>(false);
  const [isJobDetailsDialogOpen, setIsJobDetailsDialogOpen] =
    useState<boolean>(false);
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
          const response = await api.get<Job[]>(`/jobs/${connectedAddress}`);
          const sortedList = response.data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
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
      await api.post<Job>("/job", {
        pattern,
        deployer: address,
        owner: address,
      });

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
        <a href="/" className="text-blue-400 text-2xl font-mono">
          addressforge
        </a>
        <GetGolem />
        <WalletButton />
      </header>

      <div className="flex flex-col items-center space-y-6 max-w-[28.5rem] mx-auto">
        <div className="bg-gray-800 p-6 rounded-2xl space-y-6 w-full font-mono border border-blue-500 shadow-[0_0_10px_#0000ff]">
          <DeployerSection
            address={address}
            glitchEffect={glitchEffect}
            onEditClick={() => setIsAddressDialogOpen(true)}
          />

          <AddressInput value={pattern} onChange={setPattern} title="Pattern" />

          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-black font-bold py-3 rounded-md transition-colors shadow-[0_0_10px_#0000ff]"
            onClick={handleSubmit}
          >
            EXECUTE
          </button>
        </div>

        <HistorySection
          isConnected={isConnected}
          jobs={jobs}
          onJobClick={(job) => {
            setSelectedJob(job);
            setIsJobDetailsDialogOpen(true);
          }}
        />
      </div>

      <AddressDialog
        isOpen={isAddressDialogOpen}
        onClose={() => setIsAddressDialogOpen(false)}
        editAddress={editAddress}
        setEditAddress={setEditAddress}
        onSubmit={handleEditSubmit}
      />

      <JobDetails
        isOpen={isJobDetailsDialogOpen}
        onClose={() => setIsJobDetailsDialogOpen(false)}
        job={selectedJob}
      />
    </div>
  );
}
