import React from 'react';
import { Route, Routes } from 'react-router-dom';

import GeneralPage from './pages/GeneralPage';
import DictDescriptionPage from './pages/DictDescriptionPage';

const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path={''} element={<GeneralPage />} />
        <Route path={':dictOid'} element={<DictDescriptionPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
