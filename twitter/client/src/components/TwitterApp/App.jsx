import React from 'react';
import { Header } from './Header.jsx';
import { Content } from './Content.jsx';
import menu from './data/menu';

const App = () => (
  <div>
    <Header title="Twitter" items={menu} />
    <Content />
  </div>
);

export { App };
