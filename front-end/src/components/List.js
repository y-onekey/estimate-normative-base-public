import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    // width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FolderList({ items, secondaryText, icon }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {items
      && items.map((item) => (
        <ListItem key={item}>
          <ListItemAvatar>
            <Avatar>
              {icon}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item} secondary={secondaryText} />
        </ListItem>
      ))}
    </List>
  );
}

FolderList.propTypes = {
  items: PropTypes.array,
  secondaryText: PropTypes.string,
  icon: PropTypes.node,
};
