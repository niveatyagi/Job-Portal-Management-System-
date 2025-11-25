import { Divider, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import JobDesc from "../JobDesc/JobDesc";
import React from "react";

const JobDesPage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['Poppins'] pt-10 p-4 text-white">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/find-jobs">
          <Button
            variant="filled"
            color="yellow"
            leftSection={<IconArrowLeft size={18} />}
            className="!bg-yellow-400 text-black font-semibold shadow-md hover:!bg-yellow-500 hover:shadow-yellow-500/50 transition-all duration-200"
          >
            Back
          </Button>
        </Link>
      </div>

      {/* Job Description Section */}
      <div className="flex gap-5">
        <JobDesc />
      </div>
    </div>
  );
};

export default JobDesPage;
