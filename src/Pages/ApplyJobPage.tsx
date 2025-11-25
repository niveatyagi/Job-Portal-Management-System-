import { Button, Divider } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";
import ApplyJobComp from "../ApplyJob/ApplyJobComp";

const ApplyJobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (id) {
      getJob(id)
        .then((res) => {
          setJob(res); // if API returns res.data → use setJob(res.data)
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['Poppins'] p-4 mb-6">
      <Divider size="xs" />

      <Button
                 variant="filled"
                 color="yellow"
                 leftSection={<IconArrowLeft size={18} />}
                 onClick={() => navigate(-1)}
                 className="!bg-yellow-400 text-black font-semibold shadow-md hover:!bg-yellow-500 hover:shadow-yellow-500/50 transition-all duration-200 mt-6"
               >
                 Back
               </Button>

      {loading ? (
        <div className="text-white text-center py-10 text-xl">
          Loading job details...
        </div>
      ) : job ? (
        <ApplyJobComp {...job} />
      ) : (
        <div className="text-red-400 text-center py-10 text-xl">
          Job not found.
        </div>
      )}
    </div>
  );
};

export default ApplyJobPage;
