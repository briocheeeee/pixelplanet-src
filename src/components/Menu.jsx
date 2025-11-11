/*
 * Menu with Buttons on the top left
 *
 */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import HelpButton from './buttons/HelpButton.jsx';
import SettingsButton from './buttons/SettingsButton.jsx';
import LogInButton from './buttons/LogInButton.jsx';
import DownloadButton from './buttons/DownloadButton.jsx';

const Menu = () => {
  const menuOpen = useSelector((state) => state.gui.menuOpen);
  return (
    <div className="menu show">
      <LogInButton />
      <SettingsButton />
      <DownloadButton />
      <HelpButton />
    </div>
  );
};

export default React.memo(Menu);
