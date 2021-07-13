/* eslint-disable camelcase */
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {
  Field, FieldArray, Form, Formik
} from 'formik';
import { CheckboxWithLabel, TextField, Select } from 'formik-material-ui';
import React from 'react';
import {
  array, boolean, number, object, string, ValidationError
} from 'yup';

const emptyDonation = { position: '', quantity: 0 };
const useStyles = makeStyles((theme) => ({
  errorColor: {
    color: theme.palette.error.main,
  },
  noWrap: {
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap',
    },
  },
}));

export default function Home({ recordForEdit }) {
  console.log('recordForEdit', recordForEdit);
  const classes = useStyles();

  const [valuesProp, setValuesProp] = React.useState(recordForEdit);

  console.log(setValuesProp);

  return (
    <Card>
      <CardContent>
        <Formik
          initialValues={{
            name: valuesProp.name,
            donationsAmount: 0,
            termsAndConditions: false,
            mechanism_uses: [emptyDonation],
          }}
          validationSchema={object({
            name: string()
              .required('Поле Название объязательна к заполнению')
              .min(2, 'Your name needs to be at least 3 characters')
              .max(10, 'Your name needs to be at most 10 characters'),
            donationsAmount: number().required().min(10),
            termsAndConditions: boolean().required().isTrue,
            mechanism_uses: array(
              object({
                position: string()
                  .required('Institution name needed')
                  .min(3, 'Institution name needs to be at least 3 characters')
                  .max(
                    10,
                    'Institution name needs to be at most 10 characters'
                  ),
                quantity: number()
                  .required('Percentage needed')
                  .min(1, 'Percentage needs to be at least 1%')
                  .max(100, 'Percentage can be at most 100%'),
              })
            )
              .min(1, 'You need to provide at least 1 position')
              .max(3, 'You can only provide 3 position')
              .test((mechanism_uses) => {
                const sum = mechanism_uses?.reduce(
                  (acc, curr) => acc + (curr.quantity || 0),
                  0
                );

                if (sum !== 100) {
                  return new ValidationError(
                    `Percentage should be 100%, but you have ${sum}%`,
                    undefined,
                    'mechanism_uses'
                  );
                }

                return true;
              }),
          })}
          onSubmit={async (values) => {
            console.log('my values', values);
            return new Promise((res) => setTimeout(res, 2500));
          }}
        >
          {({
            values, errors, isSubmitting,
            // isValid
          }) => (
            <Form autoComplete="off">
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Field
                    fullWidth
                    name="name"
                    component={TextField}
                    label="Name"
                  />
                </Grid>

                <Grid item>
                  <Field
                    fullWidth
                    name="donationsAmount"
                    type="number"
                    component={TextField}
                    label="Donation (£)"
                  />
                </Grid>

                <FieldArray name="mechanism_uses">
                  {({ push, remove }) => (
                    <>
                      <Grid item>
                        <Typography variant="body2">
                          All your mechanism_uses
                        </Typography>
                      </Grid>

                      {values.mechanism_uses.map((_, index) => (
                        <Grid
                          container
                          item
                          className={classes.noWrap}
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          spacing={2}
                        >
                          <Grid item container spacing={2} xs={12} sm="auto">
                            <Grid item xs={12} sm={6}>
                              <Field
                                fullWidth
                                name={`mechanism_uses.${index}.position`}
                                component={Select}
                                label="Institution"
                                options={['aaa', 'bbb']}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                fullWidth
                                name={`mechanism_uses[${index}].quantity`}
                                component={TextField}
                                type="number"
                                label="Percentage (%)"
                              />
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm="auto">
                            <Button
                              disabled={isSubmitting}
                              onClick={() => remove(index)}
                            >
                              Delete
                            </Button>
                          </Grid>
                        </Grid>
                      ))}

                      <Grid item>
                        {typeof errors.mechanism_uses === 'string' ? (
                          <Typography color="error">
                            {errors.mechanism_uses}
                          </Typography>
                        ) : null}
                      </Grid>

                      <Grid item>
                        <Button
                          disabled={isSubmitting}
                          variant="contained"
                          onClick={() => push(emptyDonation)}
                        >
                          Add Donation
                        </Button>
                      </Grid>
                    </>
                  )}
                </FieldArray>

                <Grid item>
                  <Field
                    name="termsAndConditions"
                    type="checkbox"
                    component={CheckboxWithLabel}
                    Label={{
                      label: 'I accept the terms and conditions',
                      className: errors.termsAndConditions
                        ? classes.errorColor
                        : undefined,
                    }}
                  />
                </Grid>

                <Grid item>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={
                      isSubmitting ? (
                        <CircularProgress size="0.9rem" />
                      ) : undefined
                    }
                  >
                    {isSubmitting ? 'Submitting' : 'Submit'}
                  </Button>
                </Grid>
              </Grid>

              <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

Home.propTypes = {
  recordForEdit: PropTypes.object,
};
