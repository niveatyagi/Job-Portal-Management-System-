import {
  Checkbox,
  Combobox,
  Group,
  Input,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core";
import { IconSelector } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlices";

const MultiInputJobs = (props: any) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);

  const dispatch = useDispatch();
  const combobox = useCombobox();

  useEffect(() => {
    setData(props.options ?? []);
  }, [props.options]);

  const exactOptionMatch = data.some((item) => item === search);

  const keyMap: any = {
    "Job Title": "jobTitle",
    Location: "location",
    Experience: "experience",
    "Job Type": "jobType",
  };

  const filterKey = keyMap[props.title];

  const handleValueSelect = (val: string) => {
    let newVal = [];

    if (val === "$create") {
      newVal = [...value, search];
      setValue(newVal);
    } else {
      newVal = value.includes(val)
        ? value.filter((v) => v !== val)
        : [...value, val];
      setValue(newVal);
    }

    dispatch(updateFilter({ [filterKey]: newVal.length > 0 ? newVal : undefined }));
    setSearch("");
  };

  const handleValueRemove = (val: string) => {
    const newVal = value.filter((v) => v !== val);
    setValue(newVal);
    dispatch(updateFilter({ [filterKey]: newVal.length > 0 ? newVal : undefined }));
  };

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const Icon = props.icon;

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput
          variant="unstyled"
          className="w-full min-h-[3rem] px-2 border border-mine-shaft-700 rounded-md bg-transparent text-white"
          rightSection={<IconSelector className="text-mine-shaft-300" />}
          onClick={() => combobox.toggleDropdown()}
          leftSection={
            <div className="text-bright-sun-300 p-1 bg-mine-shaft-900 rounded-md mr-2">
              <Icon size={18} />
            </div>
          }
        >
          <Pill.Group>
            {value.length > 0 ? (
              values
            ) : (
              <Input.Placeholder className="!text-mine-shaft-300 text-sm">
                {props.title}
              </Input.Placeholder>
            )}
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown className="bg-mine-shaft-900 border border-mine-shaft-700 text-white">
        <Combobox.Search
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Search..."
          className="bg-transparent text-white placeholder-mine-shaft-500"
        />

        <Combobox.Options className="bg-transparent text-white">
          {data
            .filter((item) => item.toLowerCase().includes(search.toLowerCase()))
            .map((item) => (
              <Combobox.Option value={item} key={item} className="hover:bg-mine-shaft-700">
                <Group gap="sm">
                  <Checkbox
                    size="xs"
                    color="yellow"
                    checked={value.includes(item)}
                    onChange={() => {}}
                    aria-hidden
                    tabIndex={-1}
                    style={{ pointerEvents: "none" }}
                  />
                  {item}
                </Group>
              </Combobox.Option>
            ))}

          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create" className="text-yellow-300">
              + Create "{search}"
            </Combobox.Option>
          )}

          {exactOptionMatch && search.trim().length > 0 && data.length === 0 && (
            <Combobox.Empty>No matches found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default MultiInputJobs;
