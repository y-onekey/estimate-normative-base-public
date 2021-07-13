import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      // default: colors.common.white,
      default: '#f4f5fd',
      paper: colors.common.white
    },
    primary: {
      // main: colors.indigo[500]
      main: '#333996',
      light: '#3c44b126'
    },
    secondary: {
      // main: colors.indigo[500]
      main: '#f83245',
      light: '#f8324526'
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  shadows,
  typography,
  shape: {
    borderRadius: '12px',
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)',
      }
    }
  }

});

export default theme;
