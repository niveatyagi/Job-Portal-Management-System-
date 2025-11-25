import React, { useEffect, useState } from "react";
import PostedJob from "../PostedJob/PostedJob";
import PostedJobDesc from "../PostedJob/PostedJobDesc";
import { getJobPostedBy } from "../Services/JobService";
import { useSelector } from "react-redux";
import { RootState } from "../Store";

const PostedJobPage = () => {
  const user = useSelector((state: RootState) => state.user);

  const [jobList, setJobList] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchJobs = async () => {
      setLoading(true);
      const jobs = await getJobPostedBy(user.id);
      setJobList(jobs);
      if (jobs.length > 0) setSelectedJob(jobs[0]);
      setLoading(false);
    };

    fetchJobs();
  }, [user]);

  if (loading) return <div className="pt-24 p-6 text-white">Loading...</div>;

  return (
    <div className="pt-24 flex gap-6 p-6">
      <PostedJob
        jobList={jobList}
        selectedJobId={selectedJob?._id}
        onSelect={(job) => setSelectedJob(job)}
      />

      <div className="flex-1">
        {selectedJob ? (
          <PostedJobDesc {...selectedJob} />
        ) : (
          <div className="text-white text-lg">No Job Available</div>
        )}
      </div>
    </div>
  );
};

export default PostedJobPage;
