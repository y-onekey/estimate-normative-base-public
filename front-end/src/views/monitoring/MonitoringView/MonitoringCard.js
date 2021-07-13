import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.3)',
    backgroundColor: '#fafafa'
  },
  media: {
    height: 300
  }
});

const MonitoringCard = ({
  className, title, icon, description, linkCreate
}) => {
  const classes = useStyles();
  // const preventDefault = (event) => event.preventDefault();

  return (
    <Card className={clsx(classes.root, className)}>
      <CardActionArea onClick={() => console.log('clicked')}>
        <CardMedia
          component="img"
          alt="MaterialIcon"
          // height="140"
          image={icon}
          title="MaterialIcon"
          classes={classes.media}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Изменить
        </Button>
        <Button size="small" color="primary">
          Показать
        </Button>
        <Button size="small" color="primary">
          <Link href={linkCreate}>
            Добавить
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

MonitoringCard.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  linkCreate: PropTypes.string,
};

export default MonitoringCard;
