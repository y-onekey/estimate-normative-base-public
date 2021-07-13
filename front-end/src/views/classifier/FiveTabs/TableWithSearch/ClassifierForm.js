/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';

// import CountrySelect from 'src/components/controls/CountrySelect';
import { useForm, Form } from 'src/components/useForm';
import Controls from 'src/components/controls';
import FreeSoloCreateOption from 'src/components/controls/Autocomplete';

import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import TitleIcon from '@material-ui/icons/Title';

const ClassifierForm = (props) => {
  const {
    addOrEdit,
    recordForEdit,
    withRelatedTable,
    relatedTableService,
    relatedField,
    unit: unitProp,
  } = props;
  const [books, setBooks] = useState([]);
  const [units, setUnits] = useState([]);
  let initialFValues = {
    id: 0,
    title_ru: '',
    title_tk: '',
    code: '',
  };
  if (relatedField) {
    initialFValues = { ...initialFValues, [relatedField]: -1 };
  }
  if (unitProp) {
    initialFValues = { ...initialFValues, [unitProp.field.name]: -1 };
  }
  // eslint-disable-next-line no-use-before-define
  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    const errorText = 'Это поле объязательно.';
    if ('code' in fieldValues) {
      // eslint-disable-next-line no-use-before-define
      temp.code = fieldValues.code ? '' : ''; // errorText
    }
    if ('title_ru' in fieldValues) {
      // eslint-disable-next-line no-use-before-define
      temp.title_ru = fieldValues.title_ru ? '' : ''; // errorText
    }
    if ('title_tk' in fieldValues) {
      // eslint-disable-next-line no-use-before-define
      temp.title_tk = fieldValues.title_tk ? '' : ''; // errorText
    }
    if ([relatedField] in fieldValues) {
      // eslint-disable-next-line no-use-before-define
      temp[relatedField] = fieldValues[relatedField] < 0 ? errorText : ''; // errorText
    }
    if (unitProp) {
      if ([unitProp.field.name] in fieldValues) {
        // eslint-disable-next-line no-use-before-define
        temp[unitProp.field.name] = fieldValues[unitProp.field.name] < 0 ? errorText : ''; // errorT
      }
    }
    // if ()
    // if ('book_material' in fieldValues) {
    //   // eslint-disable-next-line no-use-before-define
    //   temp.book_material = fieldValues.book_material ? '' : ''; // errorText
    // }

    // if ('code' in fieldValues) {
    //   // eslint-disable-next-line no-use-before-define
    //   temp.code = fieldValues.code ? '' : errorText;
    // }
    // if ('mobile' in fieldValues) {
    //   // eslint-disable-next-line no-use-before-define
    //   temp.mobile = fieldValues.mobile.length > 9 ? '' : 'Minimym 10 numbers required.';
    // }
    // temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? '' : 'Email is not valid.';
    // if ('departmentId' in fieldValues) {
    //   // eslint-disable-next-line no-use-before-define
    //   temp.departmentId = fieldValues.departmentId.length !== 0 ? '' : errorText;
    // }
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
    resetForm,
    success,
    setSuccess,
    loading,
    setLoading
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm, setSuccess, setLoading, setErrors);
    }
  };

  useEffect(() => {
    if (recordForEdit !== null) {
      setValues({
        ...recordForEdit
      });
    }
  }, [recordForEdit]);

  useEffect(() => {
    if (withRelatedTable) {
      relatedTableService().then((bs) => setBooks(bs.data));
    }
  }, [setBooks]);

  useEffect(() => {
    if (unitProp) {
      unitProp.service().then((us) => setUnits(us.data));
    }
  }, [setUnits]);

  const RelatedField = () => {
    return (
      <FreeSoloCreateOption
        name={relatedField}
        label="Относится к:"
        value={values[relatedField]}
        onChange={handleInputChange}
        getAllRelationOptions={books}
        error={errors[relatedField]}
      />
    );
  };

  const UnitField = () => {
    const { field: { name, label } } = unitProp;
    return (
      <FreeSoloCreateOption
        name={name}
        label={label}
        value={values[name]}
        onChange={handleInputChange}
        getAllRelationOptions={units}
        error={errors[name]}
      />
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Typography align="center" variant="h4" style={{ marginBottom: '10px' }}>
            {values.__str__ ? values.__str__ : 'Добавить новый'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {withRelatedTable && relatedField && <RelatedField />}
          {unitProp && units && <UnitField />}
          {console.log('errorsrrr', errors)}
          <Controls.Input
            type="number"
            name="code"
            label="Код"
            value={values.code.toString()}
            onChange={handleInputChange}
            error={errors.code}
            icon={<DeveloperModeIcon />}
            style={{ width: '25ch', }}
          />
          <Controls.Input
            type="string"
            name="title_ru"
            label="Название на русском"
            value={values.title_ru}
            onChange={handleInputChange}
            error={errors.title_ru}
            icon={<TitleIcon />}
          />
          <Controls.Input
            type="string"
            name="title_tk"
            label="Ady türkmençe"
            value={values.title_tk}
            onChange={handleInputChange}
            error={errors.title_tk}
            icon={<TitleIcon />}
          />
        </Grid>
        <Grid item xs={6}>
          <div>
            <Controls.LoadingButton
              type="submit"
              loading={loading}
              setLoading={setLoading}
              success={success}
            />
            <Controls.Button
              text="Сбросить"
              color="default"
              onClick={resetForm}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

ClassifierForm.propTypes = {
  addOrEdit: PropTypes.func,
  recordForEdit: PropTypes.object,
  withRelatedTable: PropTypes.bool,
  relatedTableService: PropTypes.func,
  relatedField: PropTypes.string,
  unit: PropTypes.object,
};

export default ClassifierForm;
