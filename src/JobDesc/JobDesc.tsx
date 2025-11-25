import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Divider, ActionIcon, Card } from "@mantine/core";
import {
  IconBookmark,
  IconMapPin,
  IconBriefcase,
  IconCurrencyRupee,
  IconRecharging,
} from "@tabler/icons-react";
import { getAllJobs, getJob } from "../Services/JobService";



const JobDesc = () => {
  const { id } = useParams<{ id: string }>();

  const [job, setJob] = useState<any>(null);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Job Details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await getJob(id);
        setJob(jobData);

        const allJobs = await getAllJobs();
        const rec = allJobs
          .filter((j: any) => j.id !== jobData.id)
          .slice(0, 4);

        setRecommended(rec);
      } catch (err) {
        console.log("Error fetching job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  if (!job) {
    return <div className="text-white p-10">Job not found</div>;
  }

  const icons = [
    { name: "Location", icon: IconMapPin, value: job.location },
    { name: "Experience", icon: IconBriefcase, value: job.experience },
    { name: "Salary", icon: IconCurrencyRupee, value: job.packageOffered },
    { name: "Job Type", icon: IconRecharging, value: job.jobType },
  ];

  return (
    <div className="min-h-screen bg-mine-shaft-950 text-white px-10 pt-10 pb-12 w-11/12 mx-auto space-y-10">
      <div className="flex flex-col lg:flex-row gap-10">

        {/* LEFT SECTION */}
        <div className="flex-1 space-y-10">
          <div className="bg-mine-shaft-900 rounded-2xl p-6 flex justify-between items-start shadow-md">
            <div className="flex gap-4 items-center">
              <div className="p-4 bg-mine-shaft-800 rounded-xl">
                <img
                  src={`/Icons/${job.company}.png`}
                  alt={job.company}
                  onError={(e) => (e.currentTarget.src = "/Icons/default.png")}
                  className="h-16 w-16 object-contain"
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold">{job.jobTitle}</h2>
                <p className="text-mine-shaft-300 text-lg">
                  {job.company} • Posted {job.postedDaysAgo || 0} days ago
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <Link to={`/apply-job/${job.id}`}>
                <Button
                  variant="filled"
                  className="bg-bright-sun-400 text-white font-semibold rounded-xl px-6 py-3 shadow-md hover:bg-yellow-500 hover:scale-105 transition-all duration-200"
                >
                  Apply
                </Button>
              </Link>

              <IconBookmark className="cursor-pointer text-bright-sun-400" />
            </div>
          </div>

          {/* JOB BASIC INFO */}
          <div className="flex justify-between flex-wrap gap-6 text-center">
            {icons.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <ActionIcon
                  color="brightSun.4"
                  className="h-12 w-12"
                  variant="light"
                  radius="xl"
                >
                  <item.icon className="h-4/5 w-4/5" stroke={1.5} />
                </ActionIcon>
                <div className="text-sm text-mine-shaft-300">{item.name}</div>
                <div className="font-semibold">{item.value}</div>
              </div>
            ))}
          </div>

          <Divider my="xl" />

       
      {/* DESCRIPTION */}
<div>
  <div className="text-xl font-semibold mb-3">About The Job</div>

  {(() => {
    const cleanDescription = job.description?.replace(/<[^>]+>/g, "");
    return (
      <p className="text-mine-shaft-300 leading-relaxed text-justify">
        {cleanDescription}
      </p>
    );
  })()}
</div>


          <Divider my="xl" />

          {/* ABOUT COMPANY */}
          <div>
            <div className="text-xl font-semibold mb-3">About Company</div>

            <div className="flex items-center gap-3 mb-3">
              <img
                src={`/Icons/${job.company}.png`}
                alt={job.company}
                className="h-10 w-10"
                onError={(e) => (e.currentTarget.src = "/Icons/default.png")}
              />
              <span className="text-lg font-semibold">{job.company}</span>
            </div>

            <p className="text-mine-shaft-300 leading-relaxed">
              {job.companyInfo || "No additional company details available."}
            </p>
          </div>
        </div>

        {/* RECOMMENDED JOBS */}
        <div className="w-full lg:w-[30%] bg-mine-shaft-900 rounded-2xl p-5 h-fit space-y-5 shadow-md">
          <h3 className="text-xl font-semibold mb-3 border-b border-mine-shaft-700 pb-3">
            Recommended Jobs
          </h3>

          {recommended.map((item) => (
            <Card
              key={item.id}
              shadow="sm"
              radius="lg"
              className="bg-mine-shaft-800 text-white hover:bg-mine-shaft-700 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={`/Icons/${item.company}.png`}
                  alt={item.company}
                  onError={(e) => (e.currentTarget.src = "/Icons/default.png")}
                  className="h-10 w-10 rounded-md object-contain bg-mine-shaft-700 p-2"
                />
                <div>
                  <h4 className="font-semibold text-base">{item.jobTitle}</h4>
                  <p className="text-xs text-mine-shaft-300">{item.company}</p>
                </div>
              </div>

              <p className="text-sm text-mine-shaft-400 flex items-center gap-1">
                <IconMapPin size={14} /> {item.location}
              </p>

              <p className="text-sm text-mine-shaft-400 flex items-center gap-1">
                <IconCurrencyRupee size={14} /> {item.packageOffered}
              </p>

              <div className="flex justify-between items-center mt-3">
                <Link to={`/jobdesc/${item.id}`}>
                  <Button
                    size="xs"
                    className="bg-bright-sun-400 text-black font-semibold hover:bg-bright-sun-500"
                  >
                    View
                  </Button>
                </Link>

                <IconBookmark
                  size={18}
                  className="text-bright-sun-400 cursor-pointer"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDesc;
