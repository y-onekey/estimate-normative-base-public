/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  isDecimal2orLess,
  checkDecimalsField,
} from 'src/utils/isDecimalGood';

import {
  Grid,
  Typography
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import Divider from '@material-ui/core/Divider';

import { useForm, Form } from 'src/components/useForm';
import {
  MaterialClassifierService,
  // EquipmentClassifierService,
  MechanismClassifierService,
  // UnitClassifierService,
} from 'src/services/classifier_service/';

import Controls from 'src/components/controls';
import FreeSoloCreateOption from 'src/components/controls/Autocomplete';
// import DisabledOptions from 'src/components/controls/Autocomplete_3';

import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import TitleIcon from '@material-ui/icons/Title';

const mechanismClassifierService = new MechanismClassifierService();
const materialClassifierService = new MaterialClassifierService();

const { getAllPositions: getAllMechanismPositions, } = mechanismClassifierService;
const { getAllPositions: getAllMaterialPositions, } = materialClassifierService;

const GesnNormForm = (props) => {
  const {
    addOrEdit,
    recordForEdit,
    tableId,
  } = props;

  const emptyMU = {
    // id: null,
    position: -1,
    quantity: '',
  };

  const initialFValues = {
    id: 0,
    name: '',
    name_tk: '',
    code: '',
    workers_labor_costs: '',
    work_average_grade: '',
    machinists_labor_costs: '',
    // table: values.table,
    //
    mechanism_uses: [],
    material_uses: [],
  };

  const checkNestedItemsError = (nestedItemsName, errorText, temp, fieldValues) => {
    // return '' if havent error
    if (nestedItemsName in fieldValues) {
      fieldValues[nestedItemsName].forEach((mu, idx) => {
        temp[`${nestedItemsName}_${idx}_position`] = mu.position !== emptyMU.position ? '' : 'Выберите механизм из списка.';
        if (mu.quantity === '') {
          temp[`${nestedItemsName}_${idx}_quantity`] = errorText;
        } else if (!isDecimal2orLess(mu.quantity)) {
          temp[`${nestedItemsName}_${idx}_quantity`] = 'Два знака после запятой.';
        } else {
          temp[`${nestedItemsName}_${idx}_quantity`] = '';
        }
      });
    }
    return temp;
  };

  // eslint-disable-next-line no-use-before-define
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    const errorText = 'Это поле объязательно.';
    if ('code' in fieldValues) {
      temp.code = fieldValues.code ? '' : errorText; // errorText
    }
    if ('name' in fieldValues) {
      temp.name = fieldValues.name ? '' : errorText; // errorText
    }
    if ('name_tk' in fieldValues) {
      temp.name_tk = fieldValues.name_tk ? '' : errorText; // errorText
    }
    if ('workers_labor_costs' in fieldValues) {
      temp.workers_labor_costs = checkDecimalsField('workers_labor_costs', fieldValues, temp, errorText);
    }
    if ('work_average_grade' in fieldValues) {
      temp.work_average_grade = checkDecimalsField('work_average_grade', fieldValues, temp, errorText);
    }
    if ('machinists_labor_costs' in fieldValues) {
      temp.machinists_labor_costs = checkDecimalsField('machinists_labor_costs', fieldValues, temp, errorText);
    }

    temp = checkNestedItemsError('mechanism_uses', errorText, temp, fieldValues);
    temp = checkNestedItemsError('material_uses', errorText, temp, fieldValues);
    console.log('...temp', temp);
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
    resetForm,
    success,
    setSuccess,
    loading,
    setLoading
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    console.log('handleSubmit');
    e.preventDefault();
    console.log('validate()', validate());
    if (validate()) {
      console.log('valieadaaate');
      // addOrEdit(values.id, other);
      const valuesWithTableId = {
        ...values,
        table: tableId,
      };
      addOrEdit(valuesWithTableId, resetForm, setSuccess, setLoading, setErrors);
    }
  };

  const [mechanismPositions, setMechanismPositions] = React.useState([]);
  const [materialPositions, setMaterialPositions] = React.useState([]);

  useEffect(() => {
    if (recordForEdit !== null) {
      setValues({
        ...recordForEdit
      });
    }
  }, [setValues]);

  useEffect(() => {
    getAllMechanismPositions()
      .then(({ data }) => setMechanismPositions(data))
      .catch((err) => console.log(err));
  }, [setMechanismPositions]);

  useEffect(() => {
    getAllMaterialPositions()
      .then(({ data }) => setMaterialPositions(data))
      .catch((err) => console.log(err));
  }, [setMaterialPositions]);

  const MUPosition = ({
    // id = null,
    label,
    value,
    nameOfChangeField,
    relatedField,
    idx,
    itemsPositons,
  }) => {
    const getOptionDisabled = (option) => {
      const usedMechanismIds = values[relatedField].map((mu) => mu.position);
      return usedMechanismIds.includes(option.id);
    };

    return (
      <FreeSoloCreateOption
        getOptionDisabled={getOptionDisabled}
        getAllRelationOptions={itemsPositons}
        name={`${idx}_position`}
        label={`Выбран ${label}`}
        value={value}
        onChange={handleInputChange}
        relatedField={relatedField}
        nameOfChangeField={nameOfChangeField}
        error={errors[`${relatedField}_${idx}_position`]}
      />
    );
  };
  MUPosition.propTypes = {
    // id: PropTypes.number,
    itemsPositons: PropTypes.array,
    value: PropTypes.number,
    nameOfChangeField: PropTypes.string,
    relatedField: PropTypes.string,
    idx: PropTypes.number,
    label: PropTypes.string,
  };

  const onClickBtnAddMU = (nestedItemsName) => {
    const checkExistEmptyField = () => {
      let existEmpty = false;
      const { [nestedItemsName]: array } = values;
      array.forEach(({ quantity, position }) => {
        if (position === emptyMU.position) { existEmpty = true; }
        if (quantity === emptyMU.quantity) { existEmpty = true; }
      });
      return existEmpty;
    };

    if (!checkExistEmptyField()) {
      setValues({
        ...values,
        [nestedItemsName]: [
          ...values[nestedItemsName],
          emptyMU,
        ]
      });
    }
  };

  const renderMechanismsArray = (
    label,
    nestedItemsName,
    // eslint-disable-next-line no-shadow
    values,
    itemsPositons,
  ) => {
    const nestedItems = values[nestedItemsName];
    console.log('nestedItemssss', nestedItemsName, nestedItems);
    return (
      <>
        {nestedItems
        && nestedItems.map(({ id, position, quantity }, idx) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Grid container key={id ? `${id}_${position}_${nestedItemsName}` : `und_${idx}_${position}_${nestedItemsName}`}>
              <Grid item xs={8}>
                <MUPosition
                  label={label}
                  values={values}
                  idx={idx}
                  id={id}
                  value={position}
                  nameOfChangeField="position"
                  relatedField={nestedItemsName}
                  itemsPositons={itemsPositons}
                />
              </Grid>
              <Grid item xs={1}>
                <Controls.Input
                  type="number"
                  name={`${idx}_quantity`}
                  label="маш.-ч"
                  value={quantity.toString()}
                  onChange={handleInputChange}
                  relatedField={nestedItemsName}
                  nameOfChangeField="quantity"
                  error={errors[`${nestedItemsName}_${idx}_quantity`]}
                />
              </Grid>
              <Grid item xs={1}>
                {id === undefined && (
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      setValues({
                        ...values,
                        [nestedItemsName]: [
                          ...nestedItems.slice(0, idx),
                          ...nestedItems.slice(idx + 1),
                        ],
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                )}
              </Grid>
            </Grid>
          );
        })}
        <Grid container justify="center">
          <Controls.Button
            text={`Добавить используемый ${label}`}
            onClick={() => onClickBtnAddMU(nestedItemsName)}
          />
        </Grid>
      </>
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
        <Grid item xs={2}>
          {console.log('errorsrrr', errors)}
          <Controls.Input
            type="number"
            name="code"
            label="Код"
            value={values.code.toString()}
            onChange={handleInputChange}
            error={errors.code}
            icon={<DeveloperModeIcon />}
            // style={{ width: '25ch', }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.Input
            type="string"
            name="name"
            label="Название на русском"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
            icon={<TitleIcon />}
          />
          <Controls.Input
            type="string"
            name="name_tk"
            label="Ady türkmençe"
            value={values.name_tk}
            onChange={handleInputChange}
            error={errors.name_tk}
            icon={<TitleIcon />}
          />
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Controls.Input
              type="number"
              name="workers_labor_costs"
              label="Затраты труда рабочих, чел.-ч"
              value={values.workers_labor_costs.toString()}
              onChange={handleInputChange}
              error={errors.workers_labor_costs}
              step={0.01}
              // icon={<TitleIcon />}
            />
          </Grid>
          <Grid item xs={3}>
            <Controls.Input
              type="number"
              name="work_average_grade"
              label="Средний разряд работы"
              value={values.work_average_grade.toString()}
              onChange={handleInputChange}
              error={errors.work_average_grade}
              // icon={}
            />
          </Grid>
          <Grid item xs={3}>
            <Controls.Input
              type="number"
              name="machinists_labor_costs"
              label="Затраты труда машинистов, чел.-ч"
              value={values.machinists_labor_costs.toString()}
              onChange={handleInputChange}
              error={errors.machinists_labor_costs}
              // icon={}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Typography align="center">
              МАШИНЫ И МЕХАНИЗМЫ
            </Typography>
          </Grid>
          {renderMechanismsArray(
            'механизм',
            'mechanism_uses',
            values,
            mechanismPositions
          )}
          <Grid item xs={12}>
            <Divider variant="middle" />
            <Typography align="center" style={{ marginTop: '20px' }}>
              МАТЕРИАЛЫ
            </Typography>
          </Grid>
          {renderMechanismsArray(
            'материал',
            'material_uses',
            values,
            materialPositions,
          )}
          {/* {renderMaterialsArray(values.material_uses, 'material_uses', values, ???)} */}
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

GesnNormForm.propTypes = {
  tableId: PropTypes.number,
  addOrEdit: PropTypes.func,
  recordForEdit: PropTypes.object,
};

export default GesnNormForm;
