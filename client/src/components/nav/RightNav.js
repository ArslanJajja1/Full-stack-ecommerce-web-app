import React, { useEffect, useState } from "react";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  ShopOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import Search from "../forms/Search";
const { SubMenu, Item } = Menu;

const RightNav = ({ navMode }) => {
  const [current, setCurrent] = useState("home");
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    auth.signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  useEffect(() => {
    setCurrent(location.pathname);
  }, []);

  let linkColor = navMode === "vertical" ? "black" : "white";
  return (
    <Menu
      onClick={handleClick}
      style={{
        background: "transparent",
        color: "white",
        height: "100%",
        width: "100%",
        border: "none",
      }}
      className="flex justify-content-between mr-4"
      selectedKeys={[current]}
      mode={navMode}
      theme="dark"
    >
      <Item
        className={navMode === "vertical" ? "text-dark" : "text-white"}
        key="/home"
        icon={<AppstoreOutlined />}
      >
        <Link to="/" style={{ color: linkColor }}>
          Home
        </Link>
      </Item>
      <Item
        className={navMode === "vertical" ? "text-dark" : "text-white"}
        key="/shop"
        icon={<ShoppingOutlined />}
      >
        <Link to="/shop" style={{ color: linkColor }}>
          Shop
        </Link>
      </Item>
      <Item
        className={navMode === "vertical" ? "text-dark" : "text-white"}
        key="/cart"
        icon={<ShoppingCartOutlined />}
      >
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            <span style={{ color: linkColor }}>Cart</span>
          </Badge>
        </Link>
      </Item>
      <Item key="/search">
        <Search navMode={navMode} />
      </Item>

      {!user && (
        <>
          <Item
            className={
              navMode === "vertical"
                ? "text-dark d-flex align-items-center"
                : "text-white"
            }
            key="/register"
            icon={<UserAddOutlined />}
          >
            <Link to="/register" className="text-white">
              <span style={{ color: linkColor }}> Register</span>
            </Link>
          </Item>

          <Item
            className={
              navMode === "vertical"
                ? "text-dark d-flex align-items-center"
                : "text-white"
            }
            key="/login"
            icon={<UserOutlined />}
          >
            <Link to="/login" className="text-white">
              <span style={{ color: linkColor }}>Login</span>
            </Link>
          </Item>
        </>
      )}

      {user && (
        <>
          <SubMenu
            icon={<SettingOutlined />}
            title={user.email && user.email.split("@")[0]}
            key="/user"
            className={linkColor === "white" ? `text-white userDropdown` : ""}
            theme="dark"
            style={{ color: linkColor }}
          >
            {user && user.role === "subscriber" && (
              <Link to="/user/history">
                <Item key="setting:1">Dashboard</Item>
              </Link>
            )}
            {user && user.role === "admin" && (
              <Link to="/admin/dashboard">
                <Item key="setting:2">Dashboard</Item>
              </Link>
            )}
            <Item key="setting:3" onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        </>
      )}
    </Menu>
  );
};

export default RightNav;
