import { Button, Divider } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import ApplicationForm from "./ApplicationForm";
import { timeAgo } from "../Services/Utilities";

const ApplyJobComp = (props: any) => {
  return (
    <div className="p-10 bg-mine-shaft-950 text-white min-h-screen space-y-10">
 <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="p-3 bg-mine-shaft-800 rounded-xl flex">
          <img className="h-14" src={"/icons/Google.png"} alt="" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-2xl">{props.jobTitle}</div>
        <div className="text-lg text-mine-shaft-300">{props.company} &bull; {timeAgo(props.postTime)} &bull; 
          {props.applicants ? props.applicants.length : 0} Applicants
        </div>
        </div>
      </div>

      <Divider size="xs" my="xl" />
      <ApplicationForm />
    </div>
  );
};

export default ApplyJobComp;
