import React from "react";
import Logo from "./assets/logo.png";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { MenuItems } from "./componenets";
import { Viewer } from "../../lib/types";

const { Header } = Layout;
interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const AppHeader = ({ viewer, setViewer }: Props) => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">
            <img src={Logo} alt="App logo" />
          </Link>
        </div>
      </div>
      <div className="app-header__menu-section">
        <MenuItems viewer={viewer} setViewer={setViewer} />
      </div>
    </Header>
  );
};
