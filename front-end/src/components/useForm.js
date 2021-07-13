import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const {
      name, // if relatedField it can be number (id)
      value,
      relatedField,
      nameOfChangeField,
      ...other
    } = e.target;
    // Если вложенный список
    console.log('other in useForm', other);
    if (relatedField) {
    //   // Find index of specific object using findIndex method.
      // const myArray = [...values[relatedField]];
      const indexObjectInArray = Number(name.split('_')[0]);
      // values[relatedField][indexObjectInArray][nameOfChangeField] = value;
      setValues({
        ...values,
        [relatedField]: [
          ...values[relatedField].slice(0, indexObjectInArray),
          {
            ...values[relatedField][indexObjectInArray],
            [nameOfChangeField]: value,
          },
          ...values[relatedField].slice(indexObjectInArray + 1),
          // ...values[relatedField],
          // ...myArray,
        ]
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
    if (validateOnChange) {
      validate({ [name]: value });
    }
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
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
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '93%',
      margin: theme.spacing(1),
    },
  }
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;

  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node,
};
