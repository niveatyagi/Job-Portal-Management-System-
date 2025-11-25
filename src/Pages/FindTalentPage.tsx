import { Divider } from "@mantine/core";
import SearchBar from "../FindTalent/SearchBar";
import Talents from "../FindTalent/Talents";
import { useState } from "react";

const FindTalentPage = () => {
  const [filters, setFilters] = useState({});

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] pt-24">
      <Divider size="xs" mx="md" />
      <SearchBar onFilterChange={setFilters} />
   
      <Talents filters={filters} />
    </div>
  );
};

export default FindTalentPage;
