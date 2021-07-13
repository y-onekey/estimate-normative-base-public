import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// const options = ['Option 1', 'Option 2'];

export default function ControllableStates({ options, selectedId, id }) {
  // const [value, setValue] = React.useState(options[0]);
  // const [inputValue, setInputValue] = React.useState('');
  // const [myOptions, setMyOptions] = React.useState([]);
  console.log('selected Id', selectedId);
  // React.useEffect(() => {
  //   setValue(options[0]);
  // }, []);

  return (
    <div>
      {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <div>{`valueeee: '${value}'`}</div> */}
      <br />
      <Autocomplete
        getOptionLabel={(option) => option.__str__}
        value={options[0]}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
        // inputValue={inputValue}
        // onInputChange={(event, newInputValue) => {
        //   setInputValue(newInputValue);
        // }}
        id={`controllable-states-demo ${id}`}
        options={options}
        style={{ width: 1200 }}
        renderInput={(params) => <TextField {...params} label="Controllable" variant="outlined" />}
      />
    </div>
  );
}
ControllableStates.propTypes = {
  options: PropTypes.array,
  selectedId: PropTypes.number,
  id: PropTypes.number,
};
