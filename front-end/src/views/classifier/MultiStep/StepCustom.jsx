import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';

import FreeSoloCreateOption from 'src/components/controls/Autocomplete';
// import AddForm from './AddForm';
// import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Controls from 'src/components/controls';
import Notification from 'src/components/Notification';
import ClassifierForm from '../FiveTabs/TableWithSearch/ClassifierForm';

export default function First(props) {
  const {
    getAllService,
    addService,
    unit,
    setItem,
    // setDisabledNext,
    label,
    name,
    // setNotify,
    relatedFieldItem,
    relatedField,
    handleNext,
  } = props;

  const [options, setOptions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

  const updateOptions = () => {
    return getAllService()
      .then(({ data }) => {
        if (relatedFieldItem) {
          console.log('getallserviceeee', relatedField);
          return setOptions(data.filter((item) => item[relatedField] === relatedFieldItem.id));
        }
        return setOptions(data);
      });
  };

  useEffect(() => {
    updateOptions()
      .catch((err) => console.log(err));
  }, []);

  const onChange = ({ target: { value, item: targetItem } }) => {
    console.log('llll', value);
    console.log('itemssssssssss', targetItem);
    setItem(targetItem);
    // setDisabledNext(false);
    if (handleNext) { handleNext(); }
  };

  const add = (item, resetForm, setSuccess, setLoading, setErrors) => {
    console.log('relatedField', relatedField);
    console.log('ready to send item', { ...item, [relatedField]: relatedFieldItem.id });
    addService({ ...item, [relatedField]: relatedFieldItem.id })
      // .then(() => setLoading(true))
      .then(() => updateOptions())
      .then(() => console.log('addeddd'))
      // .then(() => setSuccess(true))
      .then(() => setNotify({
        isOpen: true,
        message: 'Данные успешно изменены',
        type: 'success',
      }))
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false);
        if (error.response.data) {
          const serverErrorsObj = { ...error.response.data };
          console.log('serverErrorsObj', serverErrorsObj);
          setErrors(serverErrorsObj);
          setNotify({
            isOpen: true,
            message: `Данные не сохранены (${error.message})`,
            type: 'error',
          });
        }
      });
  };

  return (
    <>
      {console.log('options', options)}
      <FreeSoloCreateOption
        getAllRelationOptions={options}
        label={label}
        onChange={onChange}
        name={name}
        // value={item ? item.id : null}
      />
      <Divider style={{ margin: '15px' }} />
      <Controls.Button
        text="Добавить новый"
        variant="outlined"
        startIcon={showForm ? <RemoveIcon /> : <AddIcon />}
        // className={classes.newButton}
        onClick={() => setShowForm((sF) => !sF)}
      />
      {/* <AddForm /> */}
      { showForm
        && (
        <ClassifierForm
          addOrEdit={add}
          withRelatedTable={false}
          recordForEdit={null}
          unit={unit}
        />
        ) }
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

First.propTypes = {
  getAllService: PropTypes.func,
  addService: PropTypes.func,
  unit: PropTypes.func,
  setItem: PropTypes.func,
  // setDisabledNext: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  // setNotify: PropTypes.func,
  relatedFieldItem: PropTypes.object,
  relatedField: PropTypes.string,
  handleNext: PropTypes.func,
};
