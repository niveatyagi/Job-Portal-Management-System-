import { Divider, RangeSlider } from "@mantine/core";
import MultiInput from "../FindJobs/MultiInput";
import { useState, useEffect } from "react";
import { IconUserCircle } from "@tabler/icons-react";
import { searchFields } from "../Data/TalentData";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter, updateFilter } from "../Slices/FilterSlices";
import { RootState } from "../Store";

interface SearchBarProps {
  onFilterChange: (filters: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const reduxFilters = useSelector((state: RootState) => state.filter);

  const [local, setLocal] = useState({
    name: "",
    minSalary: 1,
    maxSalary: 100,
  });

  const [first, setFirst] = useState(true);

  // 🔥 COMPLETE KEY MAP (UI → backend)
const keyMap: any = {
  Skills: "skills",
  Location: "locations",         // will be converted to locations[]
  Experience: "experience",
  "Job Type": "jobType",
  "Job Title": "jobTitle",
};


// sanitize
const sanitize = (obj: any) => {
  const cleaned: any = {};
  Object.keys(obj).forEach((key) => {
    const v = obj[key];
    if (
      v === "" ||
      v === null ||
      v === undefined ||
      (Array.isArray(v) && v.length === 0)
    ) return;

    cleaned[key] = v;
  });
  return cleaned;
};

useEffect(() => {
  if (first) {
    setFirst(false);
    return;
  }

  const finalFilters = sanitize({ ...local, ...reduxFilters });
  onFilterChange(finalFilters);
}, [local, reduxFilters]);

// Salary slider
<RangeSlider
  value={[local.minSalary, local.maxSalary]}
  onChange={(val) => {
    setLocal({ ...local, minSalary: val[0], maxSalary: val[1] });
    dispatch(updateFilter({ minSalary: val[0], maxSalary: val[1] }));
  }}
/>




  return (
    <div className="px-5 py-8 items-center text-mine-shaft-100 flex">

      {/* NAME SEARCH */}
      <div className="flex items-center w-1/5">
        <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2">
          <IconUserCircle size={20} />
        </div>


        <input
          className="bg-transparent border-none outline-none text-mine-shaft-100 placeholder-mine-shaft-200"
          placeholder="Talent Name"
          value={local.name}
          onChange={(e) => {
            const newVal = e.target.value;
            setLocal({ ...local, name: newVal });
            dispatch(updateFilter({ name: newVal }));
          }}
        />
      </div>

      {/* OTHER FIELDS */}
      {searchFields.map((item: any, index: number) => (
        <div key={index} className="w-1/5 flex items-center">

          <MultiInput
            title={keyMap[item.title]}   // backend key
            uiLabel={item.title}         // UI label
            icon={item.icon}
            options={item.options}
          />

          <Divider mr="xs" size="xs" orientation="vertical" />
        </div>
      ))}


      {/* SALARY RANGE */}
      <div className="w-1/5 text-sm">
        <div className="flex justify-between mb-2 text-mine-shaft-200">
          <span>Salary</span>
          <span>₹{local.minSalary} LPA - ₹{local.maxSalary} LPA</span>
        </div>

        <RangeSlider
          color="yellow"
          size="xs"
          value={[local.minSalary, local.maxSalary]}
          onChange={(val) => {
            setLocal({ ...local, minSalary: val[0], maxSalary: val[1] });
            dispatch(updateFilter({ minSalary: val[0], maxSalary: val[1] }));
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
