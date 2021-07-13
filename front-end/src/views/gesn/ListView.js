import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ListView = (props) => {
  const {
    collections,
    renderOneItem,
  } = props;

  const classes = useStyles();

  const renderItems = (baseC) => (
    baseC.map((bc) => {
      return (
        <Grid item xl={3} lg={6} sm={6} xs={12} key={bc.id}>
          {renderOneItem(bc)}
        </Grid>
      );
    })
  );

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          {collections && renderItems(collections)}
        </Grid>
      </Container>
    </Page>
  );
};

ListView.propTypes = {
  collections: PropTypes.array,
  renderOneItem: PropTypes.func,
};

export default ListView;
