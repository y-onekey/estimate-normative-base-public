import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Notification from 'src/components/Notification';
import Dialogs from 'src/components/dialogs';
import { Grid } from '@material-ui/core';

import TabPanel from 'src/components/TabPanel';
import {
  MaterialClassifierService,
  EquipmentClassifierService,
  MechanismClassifierService,
  UnitClassifierService,
} from 'src/services/classifier_service/';
import FiveTabs from './FiveTabs/FiveTabs';
import Tree from './Tree/Tree';

import MultiStep from './MultiStep/MultiStep';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  // const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const materialClassifierService = new MaterialClassifierService();
  const equipmentClassifierService = new EquipmentClassifierService();
  const mechanismClassifierService = new MechanismClassifierService();
  const unitClassifierService = new UnitClassifierService();

  const unit = {
    field: {
      name: 'unit',
      label: 'Ед.измерения',
    },
    service: unitClassifierService.getAllUnits,
  };

  // some additional service for creating hierarhy
  const {
    getAllBooksWithRelation: getAllBooksWithRelationMaterial
  } = materialClassifierService;

  const {
    getAllBooksWithRelation: getAllBooksWithRelationEquipment
  } = equipmentClassifierService;

  const {
    getAllBooksWithRelation: getAllBooksWithRelationMechanism
  } = mechanismClassifierService;

  const materialOnly = {
    // books
    bookClassifierServices: {
      getAllService: materialClassifierService.getAllBooks,
      addService: materialClassifierService.addBook,
      editService: materialClassifierService.editBook,
      deleteService: materialClassifierService.deleteBook,
      withRelatedTable: false,
    },
    // parts
    partClassifierServices: {
      getAllService: materialClassifierService.getAllParts,
      addService: materialClassifierService.addPart,
      editService: materialClassifierService.editPart,
      deleteService: materialClassifierService.deletePart,
      withRelatedTable: true,
      relatedTableService: materialClassifierService.getAllBooks,
    },
    // sections
    sectionClassifierServices: {
      getAllService: materialClassifierService.getAllSections,
      addService: materialClassifierService.addSection,
      editService: materialClassifierService.editSection,
      deleteService: materialClassifierService.deleteSection,
      withRelatedTable: true,
      relatedTableService: materialClassifierService.getAllParts,
    },
    // groups
    groupClassifierServices: {
      getAllService: materialClassifierService.getAllGroups,
      addService: materialClassifierService.addGroup,
      editService: materialClassifierService.editGroup,
      deleteService: materialClassifierService.deleteGroup,
      withRelatedTable: true,
      relatedTableService: materialClassifierService.getAllSections,
    },
    // positions
    positionClassifierServices: {
      getAllService: materialClassifierService.getAllPositions,
      addService: materialClassifierService.addPosition,
      editService: materialClassifierService.editPosition,
      deleteService: materialClassifierService.deletePosition,
      withRelatedTable: true,
      relatedTableService: materialClassifierService.getAllGroups,
      unit,
    },
  };
  const equipmentOnly = {
    // books
    bookClassifierServices: {
      getAllService: equipmentClassifierService.getAllBooks,
      addService: equipmentClassifierService.addBook,
      editService: equipmentClassifierService.editBook,
      deleteService: equipmentClassifierService.deleteBook,
      withRelatedTable: false,
      relatedTableService: null,
    },
    // parts
    partClassifierServices: {
      getAllService: equipmentClassifierService.getAllParts,
      addService: equipmentClassifierService.addPart,
      editService: equipmentClassifierService.editPart,
      deleteService: equipmentClassifierService.deletePart,
      withRelatedTable: true,
      relatedTableService: equipmentClassifierService.getAllBooks,
    },
    // sections
    sectionClassifierServices: {
      getAllService: equipmentClassifierService.getAllSections,
      addService: equipmentClassifierService.addSection,
      editService: equipmentClassifierService.editSection,
      deleteService: equipmentClassifierService.deleteSection,
      withRelatedTable: true,
      relatedTableService: equipmentClassifierService.getAllParts,
    },
    // groups
    groupClassifierServices: {
      getAllService: equipmentClassifierService.getAllGroups,
      addService: equipmentClassifierService.addGroup,
      editService: equipmentClassifierService.editGroup,
      deleteService: equipmentClassifierService.deleteGroup,
      withRelatedTable: true,
      relatedTableService: equipmentClassifierService.getAllSections,
    },
    // positions
    positionClassifierServices: {
      getAllService: equipmentClassifierService.getAllPositions,
      addService: equipmentClassifierService.addPosition,
      editService: equipmentClassifierService.editPosition,
      deleteService: equipmentClassifierService.deletePosition,
      withRelatedTable: true,
      relatedTableService: equipmentClassifierService.getAllGroups,
      unit,
    },
  };
  const mechanismOnly = {
    // books
    bookClassifierServices: {
      getAllService: mechanismClassifierService.getAllBooks,
      addService: mechanismClassifierService.addBook,
      editService: mechanismClassifierService.editBook,
      deleteService: mechanismClassifierService.deleteBook,
      withRelatedTable: false,
      relatedTableService: null,
    },
    // parts
    // no parts
    // sections
    sectionClassifierServices: {
      getAllService: mechanismClassifierService.getAllSections,
      addService: mechanismClassifierService.addSection,
      editService: mechanismClassifierService.editSection,
      deleteService: mechanismClassifierService.deleteSection,
      withRelatedTable: true,
      relatedTableService: mechanismClassifierService.getAllBooks,
    },
    // groups
    groupClassifierServices: {
      getAllService: mechanismClassifierService.getAllGroups,
      addService: mechanismClassifierService.addGroup,
      editService: mechanismClassifierService.editGroup,
      deleteService: mechanismClassifierService.deleteGroup,
      withRelatedTable: true,
      relatedTableService: mechanismClassifierService.getAllSections,
    },
    // positions
    positionClassifierServices: {
      getAllService: mechanismClassifierService.getAllPositions,
      addService: mechanismClassifierService.addPosition,
      editService: mechanismClassifierService.editPosition,
      deleteService: mechanismClassifierService.deletePosition,
      withRelatedTable: true,
      relatedTableService: mechanismClassifierService.getAllGroups,
      unit,
    },
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Материалы" {...a11yProps(0)} />
          <Tab label="Оборудования" {...a11yProps(1)} />
          <Tab label="Механизмы" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Dialogs.ScrollPaperDialog title="Просмотреть дерево">
                <Tree
                  view="material"
                  getAllWithRelationService={getAllBooksWithRelationMaterial}
                />
              </Dialogs.ScrollPaperDialog>
            </Grid>
            <Grid item xs={6}>
              <Dialogs.ScrollPaperDialog
                disableBackdropClick
                disableEscapeKeyDown
                title="Пошаговое добавление"
                btnColor="secondary"
              >
                <MultiStep
                  resourseOnly={materialOnly}
                  view="material"
                />
              </Dialogs.ScrollPaperDialog>
            </Grid>
            <Grid item xs={12}>
              <FiveTabs
                view="material"
                withPart
                bookClassifierServices={materialOnly.bookClassifierServices}
                partClassifierServices={materialOnly.partClassifierServices}
                sectionClassifierServices={materialOnly.sectionClassifierServices}
                groupClassifierServices={materialOnly.groupClassifierServices}
                positionClassifierServices={materialOnly.positionClassifierServices}
                // notify={notify}
                // setNotify={setNotify}
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Dialogs.ScrollPaperDialog title="Просмотреть дерево">
                <Tree
                  view="equipment"
                  getAllWithRelationService={getAllBooksWithRelationEquipment}
                />
              </Dialogs.ScrollPaperDialog>
            </Grid>
            <Grid item xs={6}>
              <Dialogs.ScrollPaperDialog
                disableBackdropClick
                disableEscapeKeyDown
                title="Пошаговое добавление"
                btnColor="secondary"
              >
                <MultiStep
                  resourseOnly={equipmentOnly}
                  view="equipment"
                />
              </Dialogs.ScrollPaperDialog>
            </Grid>
            <Grid item xs={12}>
              <FiveTabs
                view="equipment"
                withPart
                bookClassifierServices={equipmentOnly.bookClassifierServices}
                partClassifierServices={equipmentOnly.partClassifierServices}
                sectionClassifierServices={equipmentOnly.sectionClassifierServices}
                groupClassifierServices={equipmentOnly.groupClassifierServices}
                positionClassifierServices={equipmentOnly.positionClassifierServices}
                // notify={notify}
                // setNotify={setNotify}
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Dialogs.ScrollPaperDialog title="Просмотреть дерево">
                <Tree
                  view="mechanism"
                  getAllWithRelationService={getAllBooksWithRelationMechanism}
                />
              </Dialogs.ScrollPaperDialog>
            </Grid>
            <Grid item xs={6}>
              <Dialogs.ScrollPaperDialog
                disableBackdropClick
                disableEscapeKeyDown
                title="Пошаговое добавление"
                btnColor="secondary"
              >
                <MultiStep
                  resourseOnly={mechanismOnly}
                  view="mechanism"
                />
              </Dialogs.ScrollPaperDialog>
            </Grid>
            <Grid item xs={12}>
              <FiveTabs
                view="mechanism"
                withPart={false}
                bookClassifierServices={mechanismOnly.bookClassifierServices}
                partClassifierServices={mechanismOnly.partClassifierServices}
                sectionClassifierServices={mechanismOnly.sectionClassifierServices}
                groupClassifierServices={mechanismOnly.groupClassifierServices}
                positionClassifierServices={mechanismOnly.positionClassifierServices}
                // notify={notify}
                // setNotify={setNotify}
              />
            </Grid>
          </Grid>
        </TabPanel>
      </SwipeableViews>
      {/* <Notification notify={notify} setNotify={setNotify} /> */}
    </div>
  );
}
