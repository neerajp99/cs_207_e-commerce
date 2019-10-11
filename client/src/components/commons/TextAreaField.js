import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  label
}) => {
  return (
    <div className="form-group">
      {label && <small className="form-text text-left">{label}</small>}
      <textarea
        className="form-control form-control-lg text-area-field text-field "
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
    </div>
  );
};

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaField;
