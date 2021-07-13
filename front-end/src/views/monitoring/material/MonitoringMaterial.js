import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import {
  Container, InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar, Typography
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import TextField from '@material-ui/core/TextField';

// import Page from 'src/components/Page';
import ClassifierService from 'src/services/classifier-service-fetch';
import * as employeeService from 'src/services/employee-service';

import PageHeader from 'src/components/PageHeader';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import useTable from 'src/components/useTable';
import Controls from 'src/components/controls';
import Popup from 'src/components/Popup';
import Notification from 'src/components/Notification';
import ConfirmDialog from 'src/components/ConfirmDialog';

import MonitoringMaterialForm from './MonitoringMaterialForm';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(3),
    paddding: theme.spacing(3),
  },
  header: {
    margin: theme.spacing(3)
  },
  searchInput: {
    width: '75%'
  },
  newButton: {
    position: 'absolute',
    right: '10px',
  }
}));

const headCells = [
  { id: 'itemName', label: 'Название элемента', disableSorting: true },
  { id: 'mobile', label: 'Телефон', disableSorting: false },
  { id: 'city', label: 'Город', disableSorting: false },
  { id: 'department', label: 'Отдел', disableSorting: false },
  { id: 'actions', label: 'Операции', disableSorting: true },
];

export default function CreateMonitoringMaterial() {
  const { pk } = useParams();
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [position, setPosition] = useState([]);
  const [filterFn, setFilterFn] = useState({ fn: (items) => { return items; } });
  const [openPopup, setOpenPopup] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [records, setRecords] = useState(employeeService.getAllEmployees());
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });

  const { getMaterialPosition } = new ClassifierService();

  const {
    TblContainer, TblHead, TblPagination, recordAfterPagingAndSorting
  } = useTable(records, headCells, filterFn);
  useEffect(() => {
    getMaterialPosition(pk).then((p) => {
      setPosition(p);
    });
  }, [setPosition]);

  const handleSearch = ({ target }) => {
    setFilterFn({
      fn: (items) => {
        if (target.value === '') {
          return items;
        }
        return items.filter((x) => x.itemName.toLowerCase().includes(target.value));
      }
    });
  };

  const addOrEdit = (employee, resetForm) => {
    if (employee.id === 0) {
      employeeService.insertEmployee(employee);
    } else {
      employeeService.updateEmployee(employee);
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(employeeService.getAllEmployees());
    setNotify({
      isOpen: true,
      message: 'Submitted successfully',
      type: 'success',
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    employeeService.deleteEmployee(id);
    setRecords(employeeService.getAllEmployees());
    setNotify({
      isOpen: true,
      message: 'Deleted successfully',
      type: 'error',
    });
  };

  return (
    <>
      <PageHeader
        title="Мониторинг"
        subTitle="Мониторинг строительных материалов"
        icon={<InsertChartIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Container maxWidth={false}>
          <Typography variant="h3" component="h3" align="center">
            {`${position.full_code} - ${position.title_ru}, ${position.unit}`}
          </Typography>
        </Container>
      </Paper>
      <Paper className={classes.pageContent}>
        <Container maxWidth={false}>
          <Toolbar>
            <Controls.Input
              className={classes.searchInput}
              label="Фильтровать (найти) элемент"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
            <Controls.Button
              text="Добавить новый"
              variant="outlined"
              startIcon={<AddIcon />}
              className={classes.newButton}
              onClick={() => {
                setOpenPopup(true);
                setRecordForEdit(null);
              }}
            />
          </Toolbar>
          <TblContainer>
            <TblHead />
            <TableBody>
              {
                recordAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.itemName}
                    </TableCell>
                    <TableCell>
                      {item.mobile}
                    </TableCell>
                    <TableCell>
                      {item.city}
                    </TableCell>
                    <TableCell>
                      {item.department}
                    </TableCell>
                    <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        onClick={() => openInPopup(item)}
                      >
                        <EditOutlinedIcon
                          fontSize="small"
                        />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        color="secondary"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: 'Are you sure to delete this?',
                            subTitle: "You can't undo this operation",
                            onConfirm: () => onDelete(item.id)
                          });
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </Controls.ActionButton>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </TblContainer>
          <TblPagination />
        </Container>
      </Paper>
      <Popup
        title="Форма мониторинга"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <MonitoringMaterialForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </>
  );
}
