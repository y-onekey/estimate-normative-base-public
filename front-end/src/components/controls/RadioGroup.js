import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup
} from '@material-ui/core';

export default function RadioGroup(props) {
  const {
    name, label, value, onChange, items
  } = props;

  return (
    <FormControl>
      <FormLabel>
        {label}
      </FormLabel>
      <MuiRadioGroup
        row
        name={name}
        value={value}
        onChange={onChange}
      >
        {
          items.map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={<Radio />}
              label={item.label}
            />
          ))
        }
      </MuiRadioGroup>
    </FormControl>
  );
}

RadioGroup.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  items: PropTypes.array,
};
