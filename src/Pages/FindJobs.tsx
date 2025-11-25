import { Divider } from "@mantine/core";
import SearchBar from "../FindJobs/SearchBar";
import Jobs from "../FindJobs/Jobs";


const FindJobs = () => {
  return (
    <div className="min-h-screen bg-mine-shaft-950 font-['Poppins'] p-6 space-y-8">
      <Divider size="xs" mx="md" />
      <SearchBar />

      <Divider size="xs" mx="md" className="my-1" />
      <Jobs />
    </div>
  );
};

export default FindJobs;
