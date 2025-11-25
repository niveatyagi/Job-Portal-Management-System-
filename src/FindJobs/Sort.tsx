import { useState } from "react";
import { Button, Combobox } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";
import { useCombobox } from "@mantine/core";

const opt = [
  "Relevance",
  "Most Recent",
  "Salary (Low to High)",
  "Salary (High to Low)",
];

const Sort = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = opt.map((item) => (
    <Combobox.Option className="!text-xs" value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      width={150}
      position="bottom-start"
      withArrow
      onOptionSubmit={(val) => {
        setSelectedItem(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <div onClick={() => combobox.toggleDropdown()}
        
          className="gap-2 text-sm cursor-pointer border border-bright-sun-400 flex p-2 items-center py-1 rounded-xl text-mine-shaft-200"
          
        >
          {selectedItem || "Sort By"} <IconAdjustments className="h-5 w-5 text-bright-sun-400"/>
        </div>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default Sort;
