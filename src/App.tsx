import React, { ReactElement } from 'react';

import './App.scss';

import AppRoutes from './appRoutes';

const App: React.FC = (): ReactElement => {
  return (
    <AppRoutes />
  );
};

export default App;
