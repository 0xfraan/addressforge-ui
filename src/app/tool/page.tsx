"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddressInput } from "../../components/AddressInput";
import { AddressDialog } from "@/components/AddressDialog";
import { useAccount, useBalance } from "wagmi";
import { WalletButton } from "@/components/WalletButton";
import { DeployerSection } from "@/components/DeployerSection";
import { HistorySection } from "@/components/HistorySection";
import { JobDetails } from "@/components/JobDetails";
import { Job } from "@/components/types";
import { ConnectKitButton } from "connectkit";
import { GetGolem } from "@/components/GetGolem";
import { GolemBalance } from "@/components/GolemBalance";
import { Footer } from "@/components/Footer";
import { GasReduction } from "@/components/GasReduction";
import { HelpIcon } from "@/components/HelpIcon";
const api = axios.create({
  baseURL: "https://backend.addressforge.xyz",
});

const SUBMISSIONS_LIMIT = 5;
const SUBMISSIONS_INTERVAL = 60 * 60 * 1000;

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
  const [submissionsLeft, setSubmissionsLeft] =
    useState<number>(SUBMISSIONS_LIMIT);
  const [isInputTouched, setIsInputTouched] = useState<boolean>(false);
  const [countdownTime, setCountdownTime] = useState<string>("");

  const GLM_CONTRACT_ADDRESS = "0x0B220b82F3eA3B7F6d9A1D8ab58930C064A2b5Bf";
  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
    address: connectedAddress,
    token: GLM_CONTRACT_ADDRESS,
  });

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

  useEffect(() => {
    const updateCountdown = () => {
      const submissions = JSON.parse(
        localStorage.getItem("submissions") || "[]"
      );
      if (submissions.length > 0 && submissionsLeft === 0) {
        const oldestSubmission = Math.min(...submissions);
        const timeUntilRenewal =
          oldestSubmission + SUBMISSIONS_INTERVAL - Date.now();
        if (timeUntilRenewal > 0) {
          const minutes = Math.floor(timeUntilRenewal / 60000);
          const seconds = Math.floor((timeUntilRenewal % 60000) / 1000);
          setCountdownTime(`${minutes}m ${seconds}s`);
        } else {
          setCountdownTime("");
        }
      } else {
        setCountdownTime("");
      }
    };

    const countdownInterval = setInterval(updateCountdown, 1000);
    return () => clearInterval(countdownInterval);
  }, [submissionsLeft]);

  useEffect(() => {
    const updateSubmissionsLeft = () => {
      const submissions = JSON.parse(
        localStorage.getItem("submissions") || "[]"
      );
      const now = Date.now();
      const validSubmissions = submissions.filter(
        (time: number) => now - time < SUBMISSIONS_INTERVAL
      );
      localStorage.setItem("submissions", JSON.stringify(validSubmissions));
      setSubmissionsLeft(
        Math.max(0, SUBMISSIONS_LIMIT - validSubmissions.length)
      );
    };

    updateSubmissionsLeft();
    const interval = setInterval(updateSubmissionsLeft, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

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

      const submissions = JSON.parse(
        localStorage.getItem("submissions") || "[]"
      );
      submissions.push(Date.now());
      localStorage.setItem("submissions", JSON.stringify(submissions));
      setSubmissionsLeft((prev) => Math.max(0, prev - 1));
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
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="container mx-auto flex justify-between items-center px-4 py-8">
        <a href="/" className="text-blue-400 text-3xl font-mono">
          addressforge
        </a>
        <div className="flex items-center space-x-6">
          {isConnected && (
            <GolemBalance data={balanceData} isLoading={isBalanceLoading} />
          )}
          <GetGolem />
          <WalletButton />
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 flex justify-center items-center">
        <div className="flex flex-col items-center space-y-6 mx-auto w-[29rem]">
          <div className="bg-gray-800 p-6 rounded-2xl space-y-6 w-full font-mono border border-blue-500 shadow-[0_0_10px_#0000ff]">
            <div className="flex space-x-4">
              <DeployerSection
                address={address}
                glitchEffect={glitchEffect}
                onEditClick={() => setIsAddressDialogOpen(true)}
                isDisabled={!isConnected}
              />
              <GasReduction
                onChange={(value) =>
                  console.log(`Selected gas reduction: ${value}`)
                }
              />
              <HelpIcon />
            </div>
            <AddressInput
              value={pattern}
              title="Pattern"
              onChange={function (value: string): void {}}
            />
            <ConnectKitButton.Custom>
              {({ isConnected, show }) => (
                <div>
                  <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md transition-colors shadow-[0_0_10px_#0000ff] disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={isConnected ? handleSubmit : show}
                    disabled={
                      !isInputTouched ||
                      (submissionsLeft === 0 && (balanceData?.value ?? 0) == 0)
                    }
                  >
                    {isConnected
                      ? submissionsLeft > 0 || (balanceData?.value ?? 0) > 0
                        ? `EXECUTE ${
                            balanceData?.value ?? 0 > 0
                              ? ""
                              : `(${submissionsLeft} left)`
                          }`
                        : countdownTime
                        ? `LIMIT RENEWS IN ${countdownTime}`
                        : "LIMIT REACHED"
                      : "CONNECT WALLET"}
                  </button>
                  {isConnected && submissionsLeft === 0 && (
                    <p className="text-red-500 text-sm mt-2 font-mono">
                      Hold at least 10 GLM tokens to continue.
                    </p>
                  )}
                </div>
              )}
            </ConnectKitButton.Custom>
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
      </main>

      <Footer />

      <AddressDialog
        isOpen={isAddressDialogOpen}
        onClose={() => setIsAddressDialogOpen(false)}
        editAddress={editAddress}
        setEditAddress={setEditAddress}
        onSubmit={handleEditSubmit}
        connectedAddress={connectedAddress}
      />

      <JobDetails
        isOpen={isJobDetailsDialogOpen}
        onClose={() => setIsJobDetailsDialogOpen(false)}
        job={selectedJob}
      />
    </div>
  );
}
