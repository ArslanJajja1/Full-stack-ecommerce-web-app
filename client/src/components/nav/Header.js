import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    auth.signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };
  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };
  let subMenuKey = 0;
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      {!user && (
        <>
          <Item
            key="register"
            icon={<UserAddOutlined />}
            style={{ marginLeft: "auto" }}
          >
            <Link to="/register">Register</Link>
          </Item>

          <Item key="login" icon={<UserOutlined />}>
            <Link to="/login">Login</Link>
          </Item>
        </>
      )}

      {user && (
        <>
          <SubMenu
            icon={<SettingOutlined />}
            title={user.email && user.email.split('@')[0]}
            key={"#" + subMenuKey++}
            style={{marginLeft:"auto"}}
          >
            <Item key="setting:1">Option 1</Item>
            <Item key="setting:2">Option 2</Item>
            <Item key="setting:3" onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        </>
      )}
    </Menu>
  );
};

export default Header;
