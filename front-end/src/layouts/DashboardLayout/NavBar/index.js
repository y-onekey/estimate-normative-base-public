import React, { useEffect, useContext } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  // Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';

import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  BookOpen as BookOpenIcon,
} from 'react-feather';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import ViewListIcon from '@material-ui/icons/ViewList';
import { CurrentUserContext } from 'src/contexts/current-user-context';
import { baseURLPart } from 'src/services/axios-instance';

import NavItem from './NavItem';

const items = [
  {
    href: '/app/geo/quarry',
    icon: BookOpenIcon,
    title: 'Карты'
  },
  {
    href: '/app/structure',
    icon: BookOpenIcon,
    title: 'Структура ПО'
  },
  {
    href: '/app/gesn',
    icon: BookOpenIcon,
    title: 'ГЭСН'
  },
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Основное'
  },
  {
    href: '/app/classifier',
    icon: ViewListIcon,
    title: 'Классификатор'
  },
  {
    href: '/app/monitoring',
    icon: InsertChartIcon,
    title: 'Мониторинг'
  },
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: 'Customers'
  },
  {
    href: '/app/products',
    icon: ShoppingBagIcon,
    title: 'Products'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    href: '/login',
    icon: LockIcon,
    title: 'Войти в систему'
  },
  {
    href: '/logout',
    icon: LockIcon,
    title: 'Выйти из системы'
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Register'
  },
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Error'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

  // const [currentUser, setCurrentUser] = useState({
  //   user_name: 'Неизвестный пользователь',
  //   email: 'n@mail.com',
  //   photo: null,
  // });

  useEffect(() => {
    const currentUserLocalStorage = JSON.parse(localStorage.getItem('current_user'));
    if (currentUserLocalStorage) {
      setCurrentUser(currentUserLocalStorage);
    }
  }, [setCurrentUser]);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={`${baseURLPart}${currentUser.photo}`}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {currentUser.user_name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {currentUser.position}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
      <Box
        p={2}
        m={2}
        bgcolor="background.dark"
      >
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          Над чем работаем?
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          Максат Гарьягдыев фронт-энд ГЭСН
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          Нурмухаммет Назаров бэк-энд ГЭСН
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {/* <Button
            color="primary"
            component="a"
            href="#"
            variant="contained"
          >
            go
          </Button> */}
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
