import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import RightNav from "./RightNav";
import { Button, Drawer, Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [smallDevice, setSmallDevice] = useState(false);
  const location = useLocation();
  const dimensions = useWindowDimensions();
  const handleWindowResize = () => {
    if (dimensions.width < 650) {
      setSmallDevice(true);
    } else {
      setSmallDevice(false);
    }
  };
  const onClose = () => {
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
      style={{ height: "50px", width: "100%" }}
    >
      <div className="logo align-self-center text-white font-weight-bold font-italic w-30">
        E-Commy
      </div>
      <div className="rightNavContainer h-100 d-flex align-items-center justify-content-end w-70">
        <div>
          {dimensions.width < 810 && (
            <MenuOutlined
              onClick={() => setOpen(true)}
              style={{ color: "white" }}
              className="hamburger"
            />
          )}
          {dimensions.width > 810 && (
            <RightNav navMode="horizontal" navTheme="white" />
          )}
        </div>
      </div>
      <Drawer
        width={200}
        className="text-white"
        placement="right"
        size="default"
        onClose={onClose}
        open={open}
        closable={false}
        drawerStyle={{ backgroundColor: "#2c2c6c", color: "white" }}
      >
        <RightNav navMode="vertical" navTheme="dark" />
      </Drawer>
    </nav>
  );
};
export default Header;
