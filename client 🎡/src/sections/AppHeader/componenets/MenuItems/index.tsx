import React from "react";
import { Button, Menu, Avatar } from "antd";
import { useMutation } from "@apollo/client";
import { LogoutOutlined, UserAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { LogOut as LogOutData } from "../../../../lib/graphql/mutations/LogOut/__generated__/LogOut";
import { LOG_OUT } from "../../../../lib/graphql";
import { Viewer } from "../../../../lib/types";
import {
  displaySuccessNotification,
  displayErrorMessage,
} from "../../../../lib/components/utils";

const { Item, SubMenu } = Menu;

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const MenuItems = ({ viewer, setViewer }: Props) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        sessionStorage.removeItem("token");
        displaySuccessNotification("You've successfully logged out!");
      }
    },
    onError: () => {
      displayErrorMessage(
        "Sorry! we weren't able to log you out! Please try again"
      );
    },
  });

  const handleLogOut = () => {
    logOut();
  };

  const subMenuLogin = viewer.id ? (
    <SubMenu key="/submenu" title={<Avatar src={viewer.avatar} />}>
      <Item key="/user">
        <Link to={`/user/${viewer.id}`}>
          <UserAddOutlined style={{ marginRight: "5px" }} />
          Profile
        </Link>
      </Item>
      <Item key="/logout">
        <div onClick={handleLogOut}>
          <LogoutOutlined style={{ marginRight: "5px" }} />
          Log out
        </div>
      </Item>
    </SubMenu>
  ) : (
    <Item key="/login">
      <Link to="/login">
        <Button type="primary">Sign In</Button>
      </Link>
    </Item>
  );
  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Item key="/host">
        <Link to="/host">
          <HomeOutlined style={{ marginRight: "5px" }} />
          Host
        </Link>
      </Item>
      {subMenuLogin}
    </Menu>
  );
};
