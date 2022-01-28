import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';

import AppRoutes from './appRoutes';
import { setupStore } from './store/store';

const store = setupStore();

const App: React.FC = (): ReactElement => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
