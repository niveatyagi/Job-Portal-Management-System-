import React from "react";
import { Button, Divider, Text } from "@mantine/core";
import { IconClockHour3 } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";

const Card = (props: any) => {
  const {
    id,
    jobTitle,
    company,
    applicants,
    experience,
    jobType,
    location,
    about,
    packageOffered,
    postTime,
    status,
  } = props;

  return (
    <div className="bg-mine-shaft-900 p-6 w-80 flex flex-col gap-5 rounded-xl cursor-pointer hover:bg-mine-shaft-800 transition">
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img
              className="h-7"
              src={`/Icons/${company || "default"}.png`}
              alt={company}
              onError={(e) => (e.currentTarget.src = "/Icons/default.png")}
            />
          </div>

          <div>
            <div className="font-semibold text-mine-shaft-100">
              {jobTitle}
            </div>

            <div className="text-xs text-mine-shaft-300">
              {company} • {applicants?.length || 0} Applicants
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 text-xs">
        <div className="py-1 px-2 bg-mine-shaft-800 text-bright-sun-400 rounded-lg">
          {experience}
        </div>
        <div className="py-1 px-2 bg-mine-shaft-800 text-bright-sun-400 rounded-lg">
          {jobType}
        </div>
        <div className="py-1 px-2 bg-mine-shaft-800 text-bright-sun-400 rounded-lg">
          {location}
        </div>
      </div>

      {/* Description */}
      <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
        {about}
      </Text>

      <Divider size="sm" color="mine-shaft-700" />

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="font-semibold text-mine-shaft-200">
          ₹{packageOffered} LPA
        </div>

        <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
          <IconClockHour3 className="h-4 w-4" stroke={1.5} />
          {status} • {postTime ? timeAgo(postTime) : "—"}
        </div>
      </div>

      {/* View Job Button */}
      <Link to={`/jobs/${id}`}>
        <Button
          className="!bg-bright-sun-200 text-white font-semibold shadow-md hover:!bg-yellow-500 hover:shadow-yellow-500/50 transition-all duration-200"
          fullWidth
          variant="outline"
        >
          View Job
        </Button>
      </Link>
    </div>
  );
};

export default Card;
