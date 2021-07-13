import React from 'react';
import { TextField, } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';

// const top100Films = [
//   { title: 'The Shawshank Redemption', year: 1994 },
//   { title: 'The Godfather', year: 1972 },
//   { title: 'The Godfather: Part II', year: 1974 },
//   { title: 'The Dark Knight', year: 2008 },
//   { title: '12 Angry Men', year: 1957 },
// ];

export default function Grouped({ data, label, setDirection }) {
  const options = data.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  return (
    <Autocomplete
      id="grouped-demo"
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(event, newValue) => {
        console.log('newValue', newValue);
        setDirection(newValue);
      }}
      getOptionSelected={(option, value) => option.id === value.id}
    />
  );
}

Grouped.propTypes = {
  data: PropTypes.array,
  label: PropTypes.string,
  setDirection: PropTypes.func,
};
