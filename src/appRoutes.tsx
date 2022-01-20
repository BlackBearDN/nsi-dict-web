import React from 'react';
import { Route, Routes } from 'react-router-dom';

import GeneralPage from './pages/generalPage';
import DictDescriptionPage from './pages/dictDescriptionPage';

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
