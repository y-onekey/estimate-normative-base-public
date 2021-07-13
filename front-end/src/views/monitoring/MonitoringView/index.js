import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';// import MaterialCard from './MaterialCard';
// import EquipmentCard from './Equipment';
// import MechanismCard from './Mechanism';
import MonitoringCard from './MonitoringCard';
import MaterialIcon from '../../../icons/MaterialIcon.png';
import EquipmentIcon from '../../../icons/EquipmentIcon.png';
import MechanismIcon from '../../../icons/MechanismIcon.png';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Monitoring = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Monitoring">
      <Container maxWidth={false}>
        <Toolbar />
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MonitoringCard
              key={1}
              icon={MaterialIcon}
              title="МОНИТОРИНГ МАТЕРИАЛОВ"
              description="Описание Мониторинга материалов"
              linkCreate="monitoring/material/create"
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MonitoringCard
              key={2}
              icon={EquipmentIcon}
              title="МОНИТОРИНГ ОБОРУДОВАНИЯ"
              description="Описание Мониторинга оборудования"
              linkCreate="monitoring/equipment/create"
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MonitoringCard
              key={3}
              icon={MechanismIcon}
              title="МОНИТОРИНГ МЕХАНИЗМОВ"
              description="Описание Мониторинга механизмов"
              linkCreate="monitoring/mechanism/create"
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Monitoring;
