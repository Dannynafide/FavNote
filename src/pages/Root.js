import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MainTemplate from 'templates/MainTemplate';
import Notes from 'pages/NotesList';
import Twitters from 'pages/TwittersList';
import { Provider } from 'react-redux';
import store from 'store/store';
import Articles from 'pages/Articles';
import { routes } from 'routes/index';
import SingleCardPage from 'pages/SingleCardPage';
import EditCardForm from 'pages/EditCardForm';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const Root = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
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

            <Route exact path={routes.notes} component={Notes} />
            <Route exact path={routes.articles} component={Articles} />
            <Route exact path={routes.twitters} component={Twitters} />

            <Route path={routes.detailsCard} component={SingleCardPage} />
            <Route path={routes.editCard} component={EditCardForm} />
          </Switch>
        </MainTemplate>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
);

export default Root;
