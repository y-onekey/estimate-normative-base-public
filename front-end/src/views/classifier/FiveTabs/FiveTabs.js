/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Tabs, Tab, Typography } from '@material-ui/core';

import BookIcon from '@material-ui/icons/Book';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import DialpadIcon from '@material-ui/icons/Dialpad';

import TabPanel from 'src/components/TabPanel';

import TableWithSearch from './TableWithSearch/TableWithSearch';

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

export default function ScrollableTabsButtonForce(props) {
  const {
    bookClassifierServices,
    partClassifierServices,
    sectionClassifierServices,
    groupClassifierServices,
    positionClassifierServices,
    withPart,
    view,
    // notify,
    // setNotify
  } = props;
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Книга" icon={<BookIcon />} {...a11yProps(0)} />
          <Tab
            label="Часть"
            icon={<CollectionsBookmarkIcon />}
            {...a11yProps(1)}
          />
          <Tab label="Раздел" icon={<BookmarksIcon />} {...a11yProps(2)} />
          <Tab
            label="Группа"
            icon={<CalendarViewDayIcon />}
            {...a11yProps(3)}
          />
          <Tab label="Позиция" icon={<DialpadIcon />} {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TableWithSearch
          title="книгу"
          classifierServices={bookClassifierServices}
          // notify={notify}
          // setNotify={setNotify}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {withPart && (
          <TableWithSearch
            title="часть"
            classifierServices={partClassifierServices}
            relatedField={`book_${view}`}
            relatedFieldRu="книге"
            // notify={notify}
            // setNotify={setNotify}
          />
        )}
        {!withPart && (
          <Typography variant="h4">У механизмов нет этой кодировки!</Typography>
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TableWithSearch
          title="раздел"
          classifierServices={sectionClassifierServices}
          relatedField={withPart ? `part_${view}` : `book_${view}`}
          relatedFieldRu={withPart ? 'части' : 'книге'}
          // notify={notify}
          // setNotify={setNotify}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TableWithSearch
          title="группу"
          classifierServices={groupClassifierServices}
          relatedField={`section_${view}`}
          relatedFieldRu="разделу"
          // notify={notify}
          // setNotify={setNotify}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <TableWithSearch
          title="позицию"
          classifierServices={positionClassifierServices}
          relatedField={`group_${view}`}
          relatedFieldRu="группе"
          // notify={notify}
          // setNotify={setNotify}
        />
      </TabPanel>
    </div>
  );
}

ScrollableTabsButtonForce.propTypes = {
  bookClassifierServices: PropTypes.object,
  partClassifierServices: PropTypes.object,
  sectionClassifierServices: PropTypes.object,
  groupClassifierServices: PropTypes.object,
  positionClassifierServices: PropTypes.object,
  withPart: PropTypes.bool,
  view: PropTypes.string,
  // setNotify: PropTypes.func
};
