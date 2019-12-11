import React from "react";
import PropTypes from "prop-types";

function Input({ id, label, name, onChange, value, type, error }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

Input.propTypes = {
  /** HTML ID */
  id: PropTypes.string.isRequired,

  /** Error to display below the input */
  error: PropTypes.string,

  /** Input label. */
  label: PropTypes.string.isRequired,

  /** Input name */
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    "text",
    "number",
    "date",
    "email",
    "password",
    "phone"
  ]).isRequired,
  value: PropTypes.string.isRequired
};

Input.defaultProps = {
  type: "text"
};

export default Input;
