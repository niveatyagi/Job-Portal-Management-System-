import React from "react";
import { JobHistoryItem } from "./JobHistoryItem";
import Card from "./Cards";

interface JobHistoryProps {
  data: JobHistoryItem[];
  title: string;
}

const JobHistory: React.FC<JobHistoryProps> = ({ data, title }) => {
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <div className="flex flex-wrap gap-6">
        {data.length === 0 ? (
          <p className="text-gray-500">No jobs found.</p>
        ) : (
          data.map((job) => (
            <Card
              key={job.id}
              {...job}
              applied={job.status === "APPLIED"}
              interviewing={job.status === "INTERVIEWED"}
              offered={job.status === "OFFERED"}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default JobHistory;
