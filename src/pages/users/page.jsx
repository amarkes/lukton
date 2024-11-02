import { Outlet } from 'react-router-dom';
import { ServicesProvider } from './context';

import React from 'react';

const ModelPage = () => {
  return (
    <ServicesProvider>
      <Outlet />
    </ServicesProvider>
  );
};


export default ModelPage;
