import { Combobox, InputBase, ScrollArea, useCombobox } from '@mantine/core';
import { useEffect, useState } from 'react';

const SelectInput = (props: any) => {
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

useEffect(() => {
  setData(props.options || []);
}, [props.options]);

useEffect(() => {
  setSearch(props.form.getInputProps(props.name).value || '');
}, [props.form, props.name]);


  const exactOptionMatch = data.some((item) => item === search);
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) => item.toLowerCase().includes(search?.toLowerCase().trim()));

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item} className='!text-white hover:!bg-gray-800'>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        if (val === '$create') {
          setData((current: string[]) => [...current, search]);
          setValue(search);
          setSearch(search);
            props.form.setFieldValue(props.name,search);
        } else {
          setValue(val);
          setSearch(val);
          props.form.setFieldValue(props.name,val);

        }
        combobox.closeDropdown();
      }}
      classNames={{
     dropdown: '!bg-mine-shaft-950 !text-white border border-gray-700 rounded-md shadow-md',
option: '!text-white hover:!bg-gray-800',


      }}
    >
      <Combobox.Target>
        <InputBase
          withAsterisk
          {...props.form.getInputProps(props.name)}

          label={props.label}
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || '');
          }}
          placeholder={props.placeholder}
          rightSectionPointerEvents="none"
          classNames={{
            input: ' !bg-mine-shaft-950 !text-white placeholder-gray-400 border-gray-700',
          }}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize mah={200} type="scroll">
            {options}
            {!exactOptionMatch && search?.trim().length > 0 && (
              <Combobox.Option value="$create" className="!text-white hover:!bg-gray-800">
                + Create {search}
              </Combobox.Option>
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SelectInput;
