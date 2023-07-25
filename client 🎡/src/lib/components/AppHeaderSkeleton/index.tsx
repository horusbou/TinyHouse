import React from "react";
import Logo from "./assets/logo.png";
import { Layout } from "antd";

const { Header } = Layout;

export const AppHeaderSkeleton = () => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <img src={Logo} alt="App logo" />
        </div>
      </div>
    </Header>
  );
};
