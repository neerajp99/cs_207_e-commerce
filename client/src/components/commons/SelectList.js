import React from "react";

import PropTypes from "prop-types";

const SelectListGroup = ({ name, value, label, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group ">
      {label && <small className="form-text text-left">{label}</small>}

      <select
        className="form-control form-control-lg select_dropdown"
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
