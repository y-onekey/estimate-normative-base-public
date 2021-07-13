/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {
  Autocomplete as MuiAutocomplete
} from '@material-ui/lab';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
// import { makeStyles } from '@material-ui/styles';

// const useStyles = makeStyles(({
// }));

import {
  // MaterialClassifierService,
  // EquipmentClassifierService,
  MechanismClassifierService,
  // UnitClassifierService,
} from 'src/services/classifier_service/';

const mechanismClassifierService = new MechanismClassifierService();

const {
  getAllPositions,
} = mechanismClassifierService;

const filter = createFilterOptions();

// const transformRelationOptions = (opts) => {
//   return opts.map((opt) => {
//     return {
//       __str__: opt.__str__,
//       id: opt.id,
//     };
//   });
// };

export default function FreeSoloCreateOption({
  // getAllRelationOptions: myOptions,
  label,
  id = null,
  name,
  value,
  onChange,
  nameOfChangeField = null,
  error = null,
  relatedField = null,
  ...other
}) {
  console.log('value at begin', value);
  // const classes = useStyles();
  // const myOptions = getAllRelationOptions;
  // eslint-disable-next-line no-shadow
  const [inputValue, setInputValue] = React.useState('');
  const [myOptions, setMyOptions] = React.useState([]);
  const [valueAutoComplete, setValueAutoComplete] = React.useState(myOptions[0]);

  React.useEffect(() => {
    getAllPositions()
      .then(({ data }) => setMyOptions(data))
      .catch((err) => console.log(err));
  }, [setMyOptions]);

  React.useEffect(() => {
    let findedItem = null;
    console.log('useEffect value', value);
    if (value) {
      findedItem = myOptions.find((item) => {
        console.log('itemmmm', item);
        return item.id === value;
      });
    }
    console.log('findedItem', findedItem);
    setValueAutoComplete(findedItem);
    console.log('valueAutoComplete', valueAutoComplete);
  }, [setValueAutoComplete]);

  // eslint-disable-next-line no-shadow
  const convertToDefEventPara = (name, newValue) => {
    console.log('nameee', name);
    if (newValue) {
      const newId = newValue.id;
      // console.log('newId', newId);
      return {
        target: {
          name,
          value: newId,
          item: newValue,
          relatedField,
          nameOfChangeField,
        }
      };
    }
    return {
      target: {
        name,
        value: -1,
      }
    };
  };

  return (
    <>

      <MuiAutocomplete
        // getOptionDisabled={}
        size="medium"
        // style={{ width: 750 }}
        name={name}
        value={valueAutoComplete}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(_, newValue) => {
          // console.log('typeof newValue', typeof newValue);
          if (typeof newValue === 'string') {
            onChange(convertToDefEventPara(name, newValue));
          } else if (newValue && newValue.inputValue) {
            onChange(convertToDefEventPara(name, newValue));
          } else {
            onChange(convertToDefEventPara(name, newValue));
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          // Suggest the creation of a new value
          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              id: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        // clearOnBlur
        handleHomeEndKeys
        id={id ? `name${id}` : name}
        options={myOptions}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.__str__;
        }}
        renderOption={(option) => option.__str__}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            // className={classes.textField}
            label={label}
            variant="outlined"
            {...(error && { error: true, helperText: error })}
          />
        )}
        {...other}
      />
    </>
  );
}

FreeSoloCreateOption.propTypes = {
  getAllRelationOptions: PropTypes.array,
  name: PropTypes.string,
  value: PropTypes.number || PropTypes.string,
  onChange: PropTypes.func,
  // values: PropTypes.object,
  // setValues: PropTypes.func,
  id: PropTypes.number,
  error: PropTypes.string,
  label: PropTypes.string,
  relatedField: PropTypes.string,
  nameOfChangeField: PropTypes.string,
};
