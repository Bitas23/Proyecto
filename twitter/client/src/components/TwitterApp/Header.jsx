// Dependencies
import React from 'react';

// Assets
import logo from './images/logo.svg';
import './css/Header.css';

export const Header = () => (
  <div className="Header">
    <div className="Logo">
      <img src={logo} alt="logo" />
      <ul className="Menu" />
    </div>
  </div>
);
