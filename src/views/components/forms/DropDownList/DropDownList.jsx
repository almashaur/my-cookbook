import React from "react";
import ReactSelect, { components } from "react-select";

const Option = (props) => (
  <div>
    <components.Option {...props}>
      <input type="checkbox" checked={props.isSelected} onChange={() => null} />{" "}
      <label>{props.label}</label>
    </components.Option>
  </div>
);

const MultiSelectDropdown = ({ options, onChange, value }) => (
  <ReactSelect
    options={options}
    isMulti
    closeMenuOnSelect={false}
    hideSelectedOptions={false}
    components={{ Option }}
    onChange={onChange}
    value={value}
  />
);

const DropDownList = ({ selectedOptions, setSelectedOptions, onChange }) => {
  const handleChange = (selected) => {
    setSelectedOptions(selected);
    if (onChange) {
      onChange(selected);
    }
  };

  const toolsOptions = [
    { value: "Knife", label: "Knife" },
    { value: "Cutting Board", label: "Cutting Board" },
    { value: "Pan", label: "Pan" },
    { value: "Oven", label: "Oven" },
    { value: "Blender", label: "Blender" },
    { value: "Measuring Cup", label: "Measuring Cup" },
  ];

  return (
    <MultiSelectDropdown
      options={toolsOptions}
      onChange={handleChange}
      value={selectedOptions}
    />
  );
};

export default DropDownList;
