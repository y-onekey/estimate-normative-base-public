import React from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function DatePicker(props) {
  const {
    name, label, value, onChange
  } = props;

  // eslint-disable-next-line no-shadow
  const convertToDefEventPara = (name, value) => ({
    target: {
      name, value
    }
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="dd.MMM.yyyy"
        name={name}
        value={value}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
      />
    </MuiPickersUtilsProvider>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default DatePicker;
