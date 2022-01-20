import React from 'react';

import './style.scss';

const Loader: React.FC = () => {
  return (
    <div className="loader-window">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
