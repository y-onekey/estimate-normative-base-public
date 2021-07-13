import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';

function Checkbox(props) {
  const {
    name,
    label,
    value,
    onChange,
  } = props;

  // eslint-disable-next-line no-shadow
  const convertToDefEventPara = (name, value) => ({
    target: {
      name, value
    }
  });

  return (
    <FormControl>
      <FormControlLabel
        control={(
          <MuiCheckbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) => onChange(convertToDefEventPara(name, e.target.checked))}
          />
        )}
        label={label}
      />
    </FormControl>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
