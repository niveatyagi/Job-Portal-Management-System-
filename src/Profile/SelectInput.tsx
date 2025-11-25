import { useEffect, useState } from "react";
import {
  Combobox,
  InputBase,
  ScrollArea,
  useCombobox,
  ComboboxChevron,
} from "@mantine/core";

interface SelectInputProps {
  label: string;
  options: string[];
  value?: string;
  placeholder?: string;
  onChange?: (val: string) => void;
}

const SelectInput = ({
  label,
  options = [],
  value: propValue = "",
  placeholder,
  onChange,
}: SelectInputProps) => {
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setData(options);
    setValue(propValue ?? "");
    setSearch(propValue ?? "");
  }, [options, propValue]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const exactOptionMatch = data.some((item) => item === search);
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase().trim())
      );

  const optionsList = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        if (val === "$create") {
          setData((prev) => [...prev, search]);
          setValue(search);
          onChange?.(search);
        } else {
          setValue(val);
          onChange?.(val);
        }
        setSearch(val === "$create" ? search : val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          withAsterisk
          label={label}
          rightSection={<ComboboxChevron />}
          value={search}
          onChange={(event) => {
            const val = event.currentTarget.value;
            setSearch(val);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || "");
          }}
          placeholder={placeholder || "Select..."}
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize mah={200} type="scroll">
            {optionsList}
            {!exactOptionMatch && search.trim().length > 0 && (
              <Combobox.Option value="$create">
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
