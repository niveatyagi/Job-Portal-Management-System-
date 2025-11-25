import { Button, Divider, Text } from "@mantine/core";
import {
  IconCheck,
  IconClockHour3,
  IconX,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import { timeAgo } from "../Services/Utilities";

const JobsCard = (props: any) => {
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.user);

  const handleViewJobClick = () => {
    if (!user) {
      notifications.show({
        title: "Login Required ⚠️",
        message: "Please login to view & apply for this job.",
        color: "red",
        icon: <IconX />,
      });
      return;
    }

    navigate(`/jobs/${props.id}`);
  };

  return (
    <div className="bg-mine-shaft-900 p-6 w-80 flex flex-col gap-5 rounded-xl cursor-pointer hover:bg-mine-shaft-800 transition">
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img className="h-7" src={`/Icons/${props.company}.png`} alt={props.company} />
          </div>

          <div>
            <div className="font-semibold text-mine-shaft-100">
              {props.jobTitle}
            </div>

            <div className="text-xs text-mine-shaft-300">
              <Link
                className="hover:text-mine-shaft-200"
                to={`/company/${props.company}`}
                onClick={(e) => e.stopPropagation()}
              >
                {props.company}
              </Link>
              {" • "}
              {props.applicants ? props.applicants.length : 0} Applicants
            </div>
          </div>
        </div>

        {/* Bookmark Removed Completely */}
      </div>

      {/* Tags */}
      <div className="flex gap-2 text-xs">
        <div className="py-1 px-2 bg-mine-shaft-800 text-bright-sun-400 rounded-lg">
          {props.experience}
        </div>
        <div className="py-1 px-2 bg-mine-shaft-800 text-bright-sun-400 rounded-lg">
          {props.jobType}
        </div>
        <div className="py-1 px-2 bg-mine-shaft-800 text-bright-sun-400 rounded-lg">
          {props.location}
        </div>
      </div>

      {/* Description */}
      <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
        {props.about}
      </Text>

      <Divider size="sm" color="mine-shaft-700" />

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="font-semibold text-mine-shaft-200">
          ₹{props.packageOffered} LPA
        </div>

        <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
          <IconClockHour3 className="h-4 w-4" stroke={1.5} />
          {timeAgo(props.postTime)}
        </div>
      </div>

      {/* View Job Button */}
      <Button
        className="!bg-bright-sun-200 text-white font-semibold shadow-md hover:!bg-yellow-500 hover:shadow-yellow-500/50 transition-all duration-200"
        fullWidth
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          handleViewJobClick();
        }}
      >
        View Job
      </Button>
    </div>
  );
};

export default JobsCard;
