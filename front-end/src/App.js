import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { CurrentUserContext, emptyUser } from 'src/contexts/current-user-context';

const App = () => {
  const routing = useRoutes(routes);
  const currentUser = useState(emptyUser);
  // const currentUser = useState({
  //   user_name: '',
  //   email: '',
  // });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CurrentUserContext.Provider value={currentUser}>
        {routing}
      </CurrentUserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
