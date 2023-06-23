import { MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const AdminNav = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const activeNavClass = (e) => {};
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
        <nav className="">
          <ul className="nav flex-column">
            <li onClick={activeNavClass} className="nav-item">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-white font-weight-bold border-bottom"
                    : "nav-link text-white font-weight-bold "
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li onClick={activeNavClass} className="nav-item">
              <NavLink
                to="/admin/product"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-white font-weight-bold border-bottom"
                    : "nav-link text-white font-weight-bold "
                }
              >
                Product
              </NavLink>
            </li>
            <li onClick={activeNavClass} className="nav-item">
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-white font-weight-bold border-bottom"
                    : "nav-link text-white font-weight-bold "
                }
              >
                Products
              </NavLink>
            </li>
            <li onClick={activeNavClass} className="nav-item">
              <NavLink
                to="/admin/category"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-white font-weight-bold border-bottom"
                    : "nav-link text-white font-weight-bold "
                }
              >
                Category
              </NavLink>
            </li>
            <li onClick={activeNavClass} className="nav-item">
              <NavLink
                to="/admin/subcategory"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-white font-weight-bold border-bottom"
                    : "nav-link text-white font-weight-bold "
                }
              >
                Sub Category
              </NavLink>
            </li>
            <li onClick={activeNavClass} className="nav-item">
              <NavLink
                to="/admin/coupon"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link text-white font-weight-bold border-bottom"
                    : "nav-link text-white font-weight-bold "
                }
              >
                Coupons
              </NavLink>
            </li>
            <li onClick={activeNavClass} className="nav-item">
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
          </ul>
        </nav>
      </Drawer>
    </>
  );
};

export default AdminNav;
