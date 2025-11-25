import { Tabs } from "@mantine/core";
import React, { useState } from "react";
import PostedJobCard from "./PostedJobCard";

interface Props {
  jobList: any[];
  onSelect: (job: any) => void;
  selectedJobId?: string | null;
}

const PostedJob = ({ jobList, onSelect, selectedJobId }: Props) => {
  const [activeTab, setActiveTab] = useState("ACTIVE");

  const filteredJobs = jobList.filter((job) => job.jobStatus === activeTab);

  return (
    <div className="bg-gray-900 rounded-xl p-4 w-80 text-white">
      <div className="text-2xl font-semibold mb-5">Jobs</div>

      <Tabs variant="pills" value={activeTab} onChange={(v) => setActiveTab(v!)}>
        <Tabs.List className="bg-gray-800 p-1 rounded-lg flex gap-1">
          {["ACTIVE", "DRAFT", "CLOSE"].map((tab) => (
            <Tabs.Tab
              key={tab}
              value={tab}
              className={`text-gray-300 rounded-lg px-3 py-2 transition
              ${
                activeTab === tab
                  ? "bg-yellow-500 text-black font-semibold"
                  : "bg-transparent hover:bg-yellow-500/20"
              }`}
            >
              {tab} [{jobList.filter((j) => j.jobStatus === tab).length}]
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <Tabs.Panel
          value={activeTab}
          className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto mt-3"
        >
          {filteredJobs.length === 0 ? (
            <div className="text-gray-500 text-center py-4">No Jobs Found</div>
          ) : (
            filteredJobs.map((job) => (
              <PostedJobCard
                key={job._id}
                {...job}
                company={job.company}
                isSelected={selectedJobId === job._id}
                onSelect={() => onSelect(job)}
              />
            ))
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default PostedJob;
