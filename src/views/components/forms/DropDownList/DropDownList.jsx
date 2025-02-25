import React, { useState } from "react";
import { default as ReactSelect, components } from "react-select";

// Custom Option component for checkboxes
const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null} // Prevent checkbox toggle
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

// MultiSelect component
const MultiSelectDropdown = ({ options, onChange, value }) => {
  return (
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
};

// Example usage in a form (without returning JSX in this snippet)
const DropDownList = ({selectedOptions, setSelectedOptions}) => {
//   const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    console.log(selectedOptions)
  };


  const toolsOptions = [
    { value: 'Knife', label: 'Knife' },
    { value: 'Cutting Board', label: 'Cutting Board' },
    { value: 'Pan', label: 'Pan' },
    { value: 'Oven', label: 'Oven' },
    { value: 'Blender', label: 'Blender' },
    { value: 'Measuring Cup', label: 'Measuring Cup' },
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