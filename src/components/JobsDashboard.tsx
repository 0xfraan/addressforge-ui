"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Job } from "./types";
import { JobCard } from "./JobCard";
import { Modal } from "./Modal";
import { AddressInput } from "./AddressInput";

export const JobsDashboard = () => {
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
