import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect
} from '@material-ui/core';

function Select(props) {
  const {
    label,
    name,
    value,
    onChange,
    options,
    error = null,
  } = props;
  return (
    <FormControl
      variant="outlined"
      {...(error && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        <MenuItem value="">None</MenuItem>
        {
          options.map(({ id, title }) => (
            <MenuItem key={id} value={id}>{title}</MenuItem>
          ))
        }
      </MuiSelect>
      { error && <FormHelperText>{error}</FormHelperText> }
    </FormControl>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  error: PropTypes.string,
};

export default Select;
