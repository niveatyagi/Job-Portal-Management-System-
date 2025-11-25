import React, { useEffect, useState } from "react";
import { Tabs, Divider, Button } from "@mantine/core";
import JobHistory from "../JobHistory/JobHistory";
import { JobHistoryItem } from "../JobHistory/JobHistoryItem";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface Applicant {
  email: string;
  applicantId: number;
  applicationStatus?: "APPLIED" | "INTERVIEWED" | "OFFERED";
}

interface JobFromBackend {
  id: number | string;
  jobTitle: string;
  company?: string;
  applicants?: Applicant[];
  experience?: string;
  jobType?: string;
  location?: string;
  about?: string;
  packageOffered?: number | string;
  postTime?: string;
}

const JobHistoryPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobHistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>("applied");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userEmail = user?.email;

    if (!userEmail) return;

    fetch("http://localhost:8080/jobs/getAll")
      .then((res) => res.json())
      .then((data: JobFromBackend[]) => {
        const appliedJobs = data
          .filter((job) =>
            job.applicants?.some(
              (a) => a.email?.toLowerCase() === userEmail.toLowerCase()
            )
          )
          .map((job) => {
            const applicant = job.applicants?.find(
              (a) => a.email?.toLowerCase() === userEmail.toLowerCase()
            );

            return {
              ...job,
              status: applicant?.applicationStatus || "APPLIED",
            };
          });

        setJobs(appliedJobs);
      })
      .catch((err) => console.error("Error fetching job history:", err));
  }, []);

  const navigate = useNavigate();

  const filtered = {
    applied: jobs.filter((j) => j.status === "APPLIED"),
    saved: [],
    offered: jobs.filter((j) => j.status === "OFFERED"),
    interviewing: jobs.filter((j) => j.status === "INTERVIEWED"),
  };

  return (
    <div className="w-full px-6 py-10">

      {/* BACK BUTTON JUST BELOW HEADER */}
      <Button
        variant="filled"
        color="yellow"
        leftSection={<IconArrowLeft size={18} />}
        onClick={() => navigate(-1)}
        className="!bg-yellow-400 text-black font-semibold shadow-md hover:!bg-yellow-500 mb-8"
      >
        Back
      </Button>

      {/* PAGE HEADING */}
      <h1 className="text-3xl text-white font-bold mb-4">
        Job History
      </h1>

      <Divider className="mb-8 border-gray-700" />

      {/* TABS SECTION */}
      <Tabs
        value={activeTab}
        onChange={(v) => setActiveTab(v || "applied")}
        unstyled
      >
        <Tabs.List className="flex gap-12 mb-8 border-b border-gray-700 pb-3">

          {["applied", "offered", "interviewing"].map((tab) => (
            <Tabs.Tab
              key={tab}
              value={tab}
              className={`cursor-pointer text-xl font-semibold tracking-wide ${
                activeTab === tab
                  ? "!text-white border-b-2 border-yellow-400 pb-2"
                  : "!text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Tabs.Tab>
          ))}

        </Tabs.List>

        <Tabs.Panel value="applied"
         className="mt-6 text-white p-4 rounded-xl">
          <JobHistory data={filtered.applied} title="Applied Jobs" />
        </Tabs.Panel>

        

        <Tabs.Panel value="offered"
          className="mt-6 text-white p-4 rounded-xl">
          <JobHistory data={filtered.offered} title="Offered Jobs" />
        </Tabs.Panel>

        <Tabs.Panel value="interviewing"
          className="mt-6 text-white p-4 rounded-xl">
          <JobHistory data={filtered.interviewing} title="Interviewing" />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default JobHistoryPage;
