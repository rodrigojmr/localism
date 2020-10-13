import React from 'react';

const LocalityContext = React.createContext({
  locality: {},
  setLocality: () => {}
});

export { LocalityContext };
