import { Checkbox, Combobox, Group, Input, Pill, PillsInput, useCombobox } from '@mantine/core';
import { IconSearch, IconSelector } from '@tabler/icons-react';
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { updateFilter } from '../Slices/FilterSlices';

const MultiInput = (props: any) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);
const dispatch =useDispatch();
  useEffect(() => {
    setData(props.options ?? []);
  }, [props.options]);


  const combobox = useCombobox();

  const exactOptionMatch = data.some((item) => item === search);
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

  if (newVal.length > 0) {
    dispatch(updateFilter({ [props.title]: newVal }));
  } else {
    dispatch(updateFilter({ [props.title]: undefined }));
  }

  setSearch("");
};


const handleValueRemove = (val: string) => {
    dispatch(updateFilter({ [props.title]: value.filter((v) => v !== val) }));
    setValue((current) => current.filter((v) => v !== val));
};


  const values = value.map((item) => (

    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = data
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item, index) => (
      <Combobox.Option
        value={item}
        key={typeof item === "string" || typeof item === "number" ? item : String(index)}
        active={value.includes(item)}
      >
        <Group gap="sm">
          <Checkbox
            size="xs"
            color="brightSun.4"
            checked={value.includes(item)}
            onChange={() => {}}
            aria-hidden
            tabIndex={-1}
            style={{ pointerEvents: "none" }}
          />
          <span className='text-mine-shaft-800'>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  // 🟢 Safe icon render
  const Icon = props.icon;

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput
          variant="unstyled"
          className="w-full min-h-[3rem]" // 🟢 visible height
          rightSection={<IconSelector />}
          onClick={() => combobox.toggleDropdown()}
          leftSection={
            <div className="text-bright-sun-400 p-1 bg-mine-shaft-900 rounded-full mr-2">
              {Icon && <Icon size={18} />}
            </div>
          }
        >
          <Pill.Group>
            {value.length > 0 ? (
              <>
                {values}
                {value.length > 1 && <Pill>+{value.length - 1} more</Pill>}
              </>
            ) : (
              <Input.Placeholder className='!text-mine-shaft-200'>  {props.uiLabel}</Input.Placeholder>
            )}
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Search
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Search..."
        />
        <Combobox.Options>
          {options}

          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
          )}

          {exactOptionMatch && search.trim().length > 0 && options.length === 0 && (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default MultiInput;
