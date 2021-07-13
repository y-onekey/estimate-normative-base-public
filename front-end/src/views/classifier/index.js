import React from 'react';

import ViewListIcon from '@material-ui/icons/ViewList';

import PageHeader from 'src/components/PageHeader';
import Main from './Main';

export default function ClassifierView() {
  return (
    <>
      <PageHeader
        title="Классификатор строительных ресурсов"
        subTitle="Классификатор строительных ресурсов Туркменистана"
        icon={<ViewListIcon fontSize="large" />}
      />
      <Main />
    </>
  );
}
