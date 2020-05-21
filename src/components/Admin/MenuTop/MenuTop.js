import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Button } from "antd";
import {
  MenuFoldOutlined,
  PoweroffOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import Logo from "../../../assets/img/png/logo.png";
// import { logout } from "../../../api/auth";
import useAuth from "../../../hooks/userAuth";
import AdminSignIn from "../../../pages/Admin/SignIn";

import "./MenuTop.scss";
// import { logout } from "../../../api/auth";

// <HomeFilled />

export default function MenuTop(props) {
  const { user, isLoading, logoutUser } = useAuth();
  const { menuCollapsed, setMenuCollapsed } = props;

  console.log(useAuth());

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img src={Logo} alt="" className="menu-top__left-logo" />
        <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
          {menuCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link">
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
