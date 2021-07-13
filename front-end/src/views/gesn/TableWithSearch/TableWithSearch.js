import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Notification from 'src/components/Notification';
// import PageHeader from 'src/components/PageHeader';

// import { useParams } from 'react-router-dom';
// import {
//   ClassifierServiceConsumer
// } from 'src/services/classifier_service/classifier_service_context';

import {
  Container,
  // InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Typography,
  // Typography,
  // Typography,
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

// import Page from 'src/components/Page';
// import ClassifierService from 'src/services/classifier-service-old';
import useTable from 'src/components/useTable';
import Controls from 'src/components/controls';
import Popup from 'src/components/Popup';
import ConfirmDialog from 'src/components/ConfirmDialog';
import GesnService from 'src/services/gesn_service';
import GesnNormForm from './NormForm/NormForm';

const {
  addNorm: addService,
  editNorm: editService,
} = new GesnService();

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(3),
    paddding: theme.spacing(3)
  },
  header: {
    margin: theme.spacing(3)
  },
  searchInput: {
    width: '75%'
  },
  newButton: {
    position: 'absolute',
    right: '10px'
  }
}));

const title = 'Норму из ГЭСН-а';

export default function TableWithSearch(props) {
  const {
    records,
    setRecords,
    updateTableData,
    tableId,
  } = props;

  // const { pk } = useParams();
  const commonHeadCells = [
    { id: 'full_code', label: 'Полный код', disableSorting: false },
    { id: 'code', label: 'Код', disableSorting: false },
    { id: 'name', label: 'Название на русском', disableSorting: false },
    // { id: 'title_tk', label: 'Название на туркменском', disableSorting: false },
  ];
  const headCells = [...commonHeadCells,
    { id: 'actions', label: 'Операции', disableSorting: true }];

  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  console.log('recordForEdit', recordForEdit);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    }
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false, title: '', subTitle: ''
  });
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

  useEffect(() => {
    updateTableData();
  }, [setRecords]);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordAfterPagingAndSorting
  } = useTable(records, headCells, filterFn);

  const handleSearch = ({ target }) => {
    setFilterFn({
      fn: (items) => {
        if (target.value === '') {
          return items;
        }
        return items.filter((x) => x.__str__.toLowerCase().includes(target.value));
      }
    });
  };

  const redaktoringData = (
    item, addOrEditservice, resetForm, setLoading, setSuccess, setErrors
  ) => {
    console.log('ready to send item', item);
    addOrEditservice(item)
      .then(() => updateTableData())
      .then(() => setOpenPopup(false))
      .then(() => setSuccess(true))
      .then(() => setNotify({
        isOpen: true,
        message: 'Данные успешно изменены',
        type: 'success',
      }))
      .then(() => resetForm())
      .catch((error) => {
        setLoading(false);
        if (error.response.data) {
          const serverErrorsObj = { ...error.response.data };
          setErrors(serverErrorsObj);
          setNotify({
            isOpen: true,
            message: `Данные не сохранены (${error.message})`,
            type: 'error',
          });
        }
      });
  };

  const addOrEdit = (item, resetForm, setSuccess, setLoading, setErrors) => {
    console.log('itemmmmm', item);
    setLoading(true);
    if (item.id === 0) {
      redaktoringData(item, addService, resetForm, setLoading, setSuccess, setErrors);
    } else {
      redaktoringData(item, editService, resetForm, setLoading, setSuccess, setErrors);
    }
    setRecordForEdit(null);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    console.log('id', id);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    // deleteService(id)
    //   .then(() => updateTableData())
    //   .then(() => setNotify({
    //     isOpen: true,
    //     message: 'Deleted successfully',
    //     type: 'info',
    //   }))
    //   .catch((error) => {
    //     if (error.response.status === 500) {
    //       setNotify({
    //         isOpen: true,
    //         message: `Данные не сохранены (${error.message})`,
    //         type: 'error',
    //       });
    //     }
    //   });
  };

  const commonHeadCellsRender = (item) => {
    return (
      <>
        {
        commonHeadCells.map((headCell) => {
          return <TableCell key={headCell.id}>{item[headCell.id]}</TableCell>;
        })
        }
      </>
    );
  };

  return (
    <>
      <Paper className={classes.pageContent}>
        <Container maxWidth={false}>
          <Typography variant="h4" align="center" noWrap>НОРМЫ</Typography>
          <Toolbar>
            <Controls.Input
              className={classes.searchInput}
              label="Фильтровать (найти) элемент"
              icon={<SearchIcon />}
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
              {recordAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
                  { commonHeadCellsRender(item) }
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => openInPopup(item)}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: 'Вы точно уверены?',
                          subTitle: 'Удаление элемента может привести к нежеламым последствиям',
                          onConfirm: () => onDelete(item.id)
                        });
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                  {/* { relatedField && <TableCell>{item[`${relatedField}_str`]}</TableCell> } */}
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </Container>
      </Paper>
      <Popup
        title={`Добавить (редактировать) ${title}`}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        {/* <Controls.Button text="Tut budet forma" /> */}
        <GesnNormForm
          // withRelatedTable={true}
          // relatedTableService={relatedTableService}
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
          tableId={tableId}
          // addOrEdit={editNorm}
          // relatedField={relatedField}
          // unit={unit}
        />
      </Popup>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

TableWithSearch.propTypes = {
  tableId: PropTypes.number,
  records: PropTypes.array,
  setRecords: PropTypes.func,
  updateTableData: PropTypes.func,
};
