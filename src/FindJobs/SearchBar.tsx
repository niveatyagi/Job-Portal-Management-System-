import { Divider, RangeSlider } from "@mantine/core";
import { dropdownData } from "../Data/JobData";
import MultiInputJobs from "./MultiInputJobs";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlices";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState<[number, number]>([1, 100]);

  return (
    <div className="flex px-5 py-8">
      {dropdownData.map((item, index) => (
        <div key={index} className="w-1/5 flex items-center">
         <MultiInputJobs {...item} />

          {/* Vertical Divider ke liye margin-right add karo */}
          <Divider mr="xs" size="xs" orientation="vertical" />
        </div>
      ))}
      <div className="w-1/5 [&_.mantine-Slider-label]:translate-y-10">
        <div className="flex justify-between items-center text-sm mb-2 w-full text-mine-shaft-200">
          <span>Salary</span>
          <span>
            &#8377;{value[0]} LPA - &#8377;{value[1]} LPA
          </span>
        </div>
        <RangeSlider
          color="yellow"
          size="xs"
          value={value}
         onChange={(val) => {
  setValue(val);
dispatch(updateFilter({ salary: val }));

}}

          labelTransitionProps={{
            transition: 'skew-down',
            duration: 150,
            timingFunction: "linear",
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
