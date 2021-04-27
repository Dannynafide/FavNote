import React from 'react';
import { ThemeContext } from 'context/index';

const withContext = (Component) =>
  function contextComponent(props) {
    return (
      <ThemeContext.Consumer>
        {(context) => <Component {...props} themeContext={context} />}
      </ThemeContext.Consumer>
    );
  };

export default withContext;
