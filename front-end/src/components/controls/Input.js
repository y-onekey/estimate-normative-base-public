import React from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, TextField } from '@material-ui/core';

export default function Input(props) {
  const {
    name, label, value, onChange, type = 'string', error = null, icon = null,
    relatedField, nameOfChangeField,
    ...other
  } = props;

  const inputOnChange = (e) => {
    if (relatedField) {
      console.log('daaaaaa');
      return {
        target: {
          name: e.target.name,
          value: e.target.value,
          relatedField,
          nameOfChangeField,
        }
      };
    }
    return {
      target: {
        name: e.target.name,
        value: e.target.value,
      }
    };
  };

  return (
    <TextField
      type={type}
      variant="filled"
      name={name}
      label={label}
      value={value}
      onChange={(e) => onChange(inputOnChange(e))}
      InputProps={icon && ({
        startAdornment: (
          <div>
            <InputAdornment position="start">
              {icon}
            </InputAdornment>
          </div>
        )
      })}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  icon: PropTypes.node,
  relatedField: PropTypes.string,
  nameOfChangeField: PropTypes.string,
};
