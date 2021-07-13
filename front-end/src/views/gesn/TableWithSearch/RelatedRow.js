import React from 'react';
import PropTypes from 'prop-types';
import FreeSoloCreateOption from 'src/components/controls/Autocomplete';
import Controls from 'src/components/controls';

import {
  // MaterialClassifierService,
  // EquipmentClassifierService,
  MechanismClassifierService,
  // UnitClassifierService,
} from 'src/services/classifier_service/';
import { Grid } from '@material-ui/core';

const mechanismClassifierService = new MechanismClassifierService();

const RelatedRow = ({ id, position, quantity, errors }) => {
  const {
    getAllPositions,
  } = mechanismClassifierService;

  const [mechanismPositions, setMechanismPositions] = React.useState([]);

  React.useEffect(() => {
    getAllPositions()
      .then(({ data }) => setMechanismPositions(data))
      .catch((err) => console.log(err));
  }, [setMechanismPositions]);

  const MUPosition = ({
    id,
    value,
    nameOfChangeField,
    relatedField
  }) => (
    <FreeSoloCreateOption
      getAllRelationOptions={mechanismPositions}
      name={id}
      label="Выбран механизм"
      value={value}
      onChange={handleInputChange}
      relatedField={relatedField}
      nameOfChangeField={nameOfChangeField}
      error={errors[value]}
    />
  );
  MUPosition.propTypes = {
    id: PropTypes.number,
    value: PropTypes.number,
    nameOfChangeField: PropTypes.string,
    relatedField: PropTypes.string,
  };

  const MUQuantity = ({
    id, value, nameOfChangeField, relatedField
  }) => (
    <Controls.Input
      type="number"
      name={id}
      label="маш.-ч"
      value={value.toString()}
      onChange={handleInputChange}
      relatedField={relatedField}
      nameOfChangeField={nameOfChangeField}
      error={errors[value]}
    />
  );
  MUQuantity.propTypes = {
    id: PropTypes.number,
    value: PropTypes.number,
    nameOfChangeField: PropTypes.string,
    relatedField: PropTypes.string,
  };

  return (
    <>
      <Grid item xs={10}>
        <MUPosition
          id={id}
          value={position}
          nameOfChangeField="position"
          relatedField="mechanism_uses"
        />
      </Grid>
      <Grid item xs={1}>
        <MUQuantity
          id={id}
          value={quantity}
          nameOfChangeField="quantity"
          relatedField="mechanism_uses"
        />
      </Grid>
    </>
  );
};

RelatedRow.propTypes = {
  id: PropTypes.number,
  position: PropTypes.number,
  quantity: PropTypes.number,
  errors: PropTypes.object,
};
