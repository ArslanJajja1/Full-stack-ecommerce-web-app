import React, { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import { Drawer } from "antd";

const UserNav = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div onClick={() => setOpen(true)} className="d-flex mt-4">
        <MenuOutlined style={{ color: "white" }} className="hamburger pr-2" />
        <p className="pointer text-white font-weight-bold">Menu</p>
      </div>
      <Drawer
        width={200}
        className="text-white"
        placement="left"
        size="default"
        onClose={onClose}
        open={open}
        closable={false}
        drawerStyle={{ backgroundColor: "#2c2c6c", color: "white" }}
      >
        <nav>
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink
                to="/user/history"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-white font-weight-bold border-bottom"
                    : "nav-link text-white font-weight-bold "
                }
              >
                History
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/user/password"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-white font-weight-bold border-bottom"
                    : "nav-link text-white font-weight-bold "
                }
              >
                Password
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/user/wishlist"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-white font-weight-bold border-bottom"
                    : "nav-link text-white font-weight-bold "
                }
              >
                Wishlist
              </NavLink>
            </li>
          </ul>
        </nav>
      </Drawer>
    </>
  );
};

export default UserNav;
