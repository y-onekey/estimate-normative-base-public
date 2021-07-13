import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { BookOpen } from 'react-feather';
// import { Typography } from '@material-ui/core';
import DetailsIcon from '@material-ui/icons/Details';
import WorkIcon from '@material-ui/icons/Work';

import PageHeader from 'src/components/PageHeader';
// import Main from './Main';
import GesnService from 'src/services/gesn_service/';
import List from 'src/components/List';

import TableWithSearch from './TableWithSearch/TableWithSearch';

import { MAINTEXT } from './BaseCollectionsListView';

export default function ClassifierView() {
  const params = useParams();
  const services = new GesnService();
  const {
    getTable,
    // addService,
    // editService,
    // deleteService,
  } = services;
  const [tableId, setTableId] = useState();
  const [tableName, setTableName] = useState();
  const [sectionName, setSectionName] = useState();
  const [records, setRecords] = useState([]);
  const [unit, setUnit] = useState(null);
  const [workScopes, setWorkScopes] = useState([]);

  const updateTableData = () => {
    return getTable(params.pk)
      .then(({ data }) => {
        console.log('data', data);
        setTableId(data.id);
        setTableName(data.__str__);
        setSectionName(data.section);
        setWorkScopes(data.work_scopes);
        setUnit(data.unit);
        return setRecords(data.norms);
      });
  };
  console.log('unit', unit);

  return (
    <>
      <PageHeader
        title={`Таблица: ${tableName}`}
        subTitle={`Таблица: ${sectionName} (${MAINTEXT})`}
        icon={<BookOpen fontSize="large" />}
      />
      <List items={workScopes} secondaryText="Состав работ" icon={<WorkIcon />} />
      <List items={Array.of(unit)} secondaryText="Измеритель" icon={<DetailsIcon />} />
      <TableWithSearch
        // tableName={tableName}
        // setTableName={setTableName}
        tableId={tableId}
        records={records}
        setRecords={setRecords}
        // sectionName={sectionName}
        // setSectionName={setSectionName}
        updateTableData={updateTableData}
      />
    </>
  );
}
