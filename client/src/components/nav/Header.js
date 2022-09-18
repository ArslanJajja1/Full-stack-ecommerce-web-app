import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RightNav from './RightNav';
import { Button, Drawer, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [smallDevice, setSmallDevice] = useState(false);
  const location = useLocation();
  const dimensions = useWindowDimensions();
  const handleWindowResize = () => {
    if (dimensions.width < 650) {
      console.log(dimensions);
      setSmallDevice(true);
    } else {
      setSmallDevice(false);
    }
  };
  const onClose = () => {
    console.log('onClose called on location change');
    setOpen(false);
  };
  useEffect(() => {
    handleWindowResize();
  }, [dimensions]);
  useEffect(() => {
    onClose();
  }, [location]);

  return (
    <nav
      className="navbar-container container-fluid d-flex justify-content-between alignt-items-center border-bottom"
      style={{ height: '50px' }}
    >
      <div className="logo align-self-center text-white font-weight-bold font-italic">
        <Link to="/" className="text-white">
          {' '}
          E-Commy
        </Link>
      </div>
      <div className="rightNavContainer h-100 d-flex align-items-center">
        {!smallDevice && <RightNav navMode="horizontal" navTheme="white" />}
        {smallDevice && <MenuOutlined onClick={() => setOpen(true)} style={{ color: 'white' }} className="hamburger" />}
      </div>
      <Drawer className="text-black" placement="right" size="default" onClose={onClose} open={open} closable={false}>
        <RightNav navMode="vertical" navTheme="dark" />
      </Drawer>
    </nav>
  );
};
export default Header;
