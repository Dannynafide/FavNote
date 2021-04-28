import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { routes } from 'routes/index';
import PrivateRoute from 'routes/PrivateRoute';
import { theme } from 'theme/mainTheme';
import MainTemplate from 'templates/MainTemplate';
import Notes from 'pages/NotesPage';
import Twitters from 'pages/TwittersPage';
import Articles from 'pages/ArticlesPage';
import SingleCardPage from 'pages/SingleCardPage';
import EditCardForm from 'pages/EditCardForm';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';

const Root = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path={routes.login} component={LoginPage} />
          <Route exact path={routes.register} component={RegisterPage} />
          <Route
            exact
            path={routes.home}
            render={() => <Redirect to={routes.notes} />}
          />
          <PrivateRoute exact path={routes.notes} component={Notes} />
          <PrivateRoute exact path={routes.articles} component={Articles} />
          <PrivateRoute exact path={routes.twitters} component={Twitters} />

          <PrivateRoute path={routes.detailsCard} component={SingleCardPage} />
          <PrivateRoute path={routes.editCard} component={EditCardForm} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  </ThemeProvider>
);
export default Root;
