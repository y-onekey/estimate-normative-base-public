/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';

import { useForm } from 'src/components/useForm';

import Controls from 'src/components/controls';
import FreeSoloCreateOption from 'src/components/controls/Autocomplete';
import { Grid } from '@material-ui/core';

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

const MechanismUsesForm = (props) => {
  const {
    // addOrEdit,
    recordForEdit,
  } = props;

  const initialFValues = {
    id: 0,
    position: 0,
    quantity: 0,
  };
  // eslint-disable-next-line no-use-before-define
  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    // const errorText = 'Это поле объязательно.';
    if ('position' in fieldValues) {
      // eslint-disable-next-line no-use-before-define
      temp.position = fieldValues.position ? '' : ''; // errorText
    }
    // eslint-disable-next-line no-use-before-define
    setErrors({
      ...temp
    });
    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === '');
    }
    console.log('non validate');
    return false;
  };

  const {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    // resetForm,
    // success,
    // setSuccess,
    // loading,
    // setLoading
  } = useForm(initialFValues, true, validate);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     addOrEdit(values, resetForm, setSuccess, setLoading, setErrors);
  //   }
  // };

  // eslint-disable-next-line no-unused-vars
  const [mechanismPositions, setMechanismPositions] = React.useState([]);

  React.useEffect(() => {
    getAllPositions()
      .then(({ data }) => setMechanismPositions(data))
      .catch((err) => console.log(err));
  }, [setMechanismPositions]);

  React.useEffect(() => {
    if (recordForEdit !== null) {
      setValues({
        ...recordForEdit
      });
    }
  }, []);

  const MUPosition = ({ id, name, value }) => (
    <FreeSoloCreateOption
      getAllRelationOptions={mechanismPositions}
      id={id}
      name={name}
      label="Выбран механизм"
      value={value}
      onChange={handleInputChange}
      error={errors[value]}
    />
  );
  MUPosition.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    value: PropTypes.number,
  };

  // eslint-disable-next-line react/prop-types
  const MUQuantity = ({ name, value }) => (
    <Controls.Input
      type="string"
      name={name}
      label="маш.-ч"
      value={value}
      onChange={handleInputChange}
      error={errors[value]}
    />
  );

  return (
    <Grid container>
      {console.log('values in MUForm', values)}
      <Grid item xs={10}>
        <MUPosition name="position" value={values.position} id={values.id} />
      </Grid>
      <Grid item xs={1}>
        <MUQuantity name="quantity" value={values.quantity} id={values.id} />
      </Grid>
    </Grid>
  );
};

MechanismUsesForm.propTypes = {
  // addOrEdit: PropTypes.func,
  recordForEdit: PropTypes.object,
};

export default MechanismUsesForm;
