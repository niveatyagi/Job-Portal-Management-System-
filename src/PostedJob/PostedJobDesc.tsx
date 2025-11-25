import React from "react";
import { Tabs, Badge } from "@mantine/core";
import TalentCard from "../FindTalent/TalentCard";
import { talents } from "../Data/TalentData";
  import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { postJob } from "../Services/JobService";

const PostedJobDesc = (props: any) => {
  const jobId = props._id || props.id;

  const handleEditJob = () => {
    console.log("Navigate to Edit Page for:", jobId);
  };


const handleCloseJob = () => {
  if (!window.confirm("Are you sure you want to close this job?")) return;

  const updatedJob = {
    ...props,
    id: props.id || props._id,
    jobStatus: "CLOSE", // 👈 correct status
  };

  postJob(updatedJob)
    .then(() => {
      notifications.show({
        title: "Job Closed Successfully 🎉",
        message: "This job has been moved to Closed tab.",
        color: "green",
        icon: <IconCheck />,
      });

      setTimeout(() => {
        window.location.reload();
      }, 800);
    })
    .catch((err) => {
      notifications.show({
        title: "Error!",
        message: err.response?.data?.errorMessage || "Failed to close job",
        color: "red",
        icon: <IconX />,
      });
      console.error(err);
    });
};


  const logoPath = `/companies/${props.company}.png`;

  if (!jobId) {
    return <div className="text-white p-10 text-xl">No Job Selected</div>;
  }

  return (
    <div className="w-full px-8 text-white">
      <div className="text-3xl font-semibold flex items-center gap-3">
        {props.jobTitle}
        <Badge variant="light" color="yellow">
          {props.jobStatus}
        </Badge>
      </div>

    

      <p className="text-gray-400 text-lg">{props.location}</p>

      <Tabs defaultValue="overview" variant="outline" radius="lg" className="mt-6">
        <Tabs.List className="flex gap-6 text-lg font-medium text-gray-300">
          {["overview", "applicants", "invited", "offered", "rejected"].map((t) => (
            <Tabs.Tab key={t} value={t} className="hover:text-yellow-400">
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <Tabs.Panel value="overview" className="mt-10">
          <div className="flex items-center gap-3">
            <img
              src={logoPath}
              className="w-12 h-12 object-contain rounded"
              alt={props.company}
              onError={(e) => (e.currentTarget.src = "/companies/default.png")}
            />
            <div>
              <div className="text-xl font-semibold">{props.company}</div>
              <div className="text-sm text-gray-400">
                Posted {props.postTime ? new Date(props.postTime).toDateString() : "N/A"}
              </div>
            </div>
   {/* Action Buttons */}
{(props.jobStatus === "ACTIVE" || props.jobStatus === "DRAFT") && (
  <div className="flex gap-3">
    <button
      className="bg-red-600 px-3 py-1 rounded-md text-sm"
      onClick={handleCloseJob}
    >
      Close
    </button>
  </div>
)}

          </div>

          {/* Overview Content — unchanged UI */}
          <div className="grid grid-cols-4 text-center mt-10 gap-4">
            {[
              { label: "Location", value: props.location, icon: "📍" },
              { label: "Experience", value: props.experience, icon: "⚡" },
              { label: "Salary", value: props.packageOffered + " LPA", icon: "💰" },
              { label: "Job Type", value: props.jobType, icon: "💼" },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-yellow-400 text-xl">{item.icon}</div>
                <div className="font-medium">{item.label}</div>
                <div className="text-gray-400">{item.value || "N/A"}</div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <div className="text-xl font-semibold">About Job</div>
            <p className="text-gray-300 mt-2">{props.about || "N/A"}</p>
          </div>

          <div className="mt-10">
            <div className="text-xl font-semibold">Description</div>
            <div
              className="prose prose-invert mt-3"
              dangerouslySetInnerHTML={{
                __html: props.description || "<p>No Description Provided</p>",
              }}
            />
          </div>

          <div className="mt-10">
            <div className="text-xl font-semibold">Required Skills</div>
            <div className="flex gap-2 flex-wrap mt-3">
              {props.skillsRequired?.length ? (
                props.skillsRequired.map((skill: string, i: number) => (
                  <span
                    key={i}
                    className="bg-gray-800 px-3 py-2 rounded-full text-sm text-yellow-300"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">No skills provided</span>
              )}
            </div>
          </div>
        </Tabs.Panel>

        {/* Applicants Panels — unchanged */}
        <Tabs.Panel value="applicants" className="mt-6">
          <div className="flex flex-wrap gap-5">
            {talents.slice(0, 6).map((t, i) => (
              <TalentCard key={i} {...t} posted={true} />
            ))}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="invited" className="mt-6">
          <div className="flex flex-wrap gap-5">
            {talents.slice(0, 6).map((t, i) => (
              <TalentCard key={i} {...t} invited={true} />
            ))}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="offered" className="mt-6">No offers yet</Tabs.Panel>
        <Tabs.Panel value="rejected" className="mt-6">No rejected applicants</Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default PostedJobDesc;
