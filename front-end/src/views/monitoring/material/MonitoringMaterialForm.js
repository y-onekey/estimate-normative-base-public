/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';

import CountrySelect from 'src/components/controls/CountrySelect';
import { useForm, Form } from 'src/components/useForm';
import Controls from 'src/components/controls';

import * as employeeService from 'src/services/employee-service';
import PropTypes from 'prop-types';

const incotermsItems = [
  { value: 'EXW', label: 'EXW' },
  { value: 'FCA', label: 'FCA' },
  { value: 'XXX', label: 'XXX' },
];

const initialFValues = {
  id: 0,
  itemName: '',
  mobile: '',
  city: '',
  incoterms: '',
  departmentId: '',
  isPermament: false,
  hireDate: new Date(),
};

const MonitoringMaterialForm = (props) => {
  const { addOrEdit, recordForEdit } = props;
  // eslint-disable-next-line no-use-before-define
  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    const errorText = 'Это поле объязательно.';
    if ('itemName' in fieldValues) {
      // eslint-disable-next-line no-use-before-define
      temp.itemName = fieldValues.itemName ? '' : errorText;
    }
    if ('mobile' in fieldValues) {
      // eslint-disable-next-line no-use-before-define
      temp.mobile = fieldValues.mobile.length > 9 ? '' : 'Minimym 10 numbers required.';
    }
    // temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? '' : 'Email is not valid.';
    if ('departmentId' in fieldValues) {
      // eslint-disable-next-line no-use-before-define
      temp.departmentId = fieldValues.departmentId.length !== 0 ? '' : errorText;
    }
    // eslint-disable-next-line no-use-before-define
    setErrors({
      ...temp
    });
    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === '');
    }
    return false;
  };

  const {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetForm
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
      // insertEmployee(values);
      // resetForm();
    }
  };

  useEffect(() => {
    if (recordForEdit !== null) {
      setValues({
        ...recordForEdit
      });
    }
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="itemName"
            label="Наименование"
            value={values.itemName}
            onChange={handleInputChange}
            error={errors.itemName}
          />
          <Controls.Input
            name="mobile"
            label="Mobile"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Controls.Input
            name="city"
            label="City"
            value={values.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CountrySelect />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name="incoterms"
            label="Инкотермс"
            value={values.incoterms}
            onChange={handleInputChange}
            items={incotermsItems}
          />
          <Controls.Select
            name="departmentId"
            label="Department"
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection}
            error={errors.departmentId}
          />
          <Controls.DatePicker
            name="hireDate"
            label="Hire Date"
            value={values.hireDate}
            onChange={handleInputChange}
          />
          <Controls.Checkbox
            name="isPermament"
            label="Permament Employee"
            value={values.isPermament}
            onChange={handleInputChange}
          />
          <div>
            <Controls.Button
              type="submit"
              text="Submit"
            />
            <Controls.Button
              text="Reset"
              color="default"
              onClick={resetForm}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

MonitoringMaterialForm.propTypes = {
  addOrEdit: PropTypes.func,
  recordForEdit: PropTypes.object,
};

export default MonitoringMaterialForm;
