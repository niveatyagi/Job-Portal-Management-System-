import Sort from "./Sort";
import JobCard from "./JobsCard";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobService";
import { useSelector } from "react-redux";
import { RootState } from "../Store";

const Jobs = () => {
  const filters = useSelector((state: RootState) => state.filter);

  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    getAllJobs(filters)
      .then((res) => {
        console.log("Jobs From API:", res);
        setJobs(res);
      })
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <div className="text-2xl text-mine-shaft-200 font-semibold">
          Recommended Jobs
        </div>
        <Sort />
      </div>

      <div className="mt-10 flex flex-wrap gap-5 min-h-[200px]">
        {loading ? (
          <p className="text-gray-400">Loading jobs...</p>
        ) : jobs.length > 0 ? (
          jobs.map((job, index) => <JobCard key={index} {...job} />)
        ) : (
          <p className="text-gray-400">No jobs found...</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
