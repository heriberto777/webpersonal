import React, { useState, useEffect } from "react";
import { Switch, List, Avatar, Button } from "antd";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import {
  EditFilled,
  StopFilled,
  DeleteFilled,
  CheckSquareFilled,
} from "@ant-design/icons";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import { getAvatarApi } from "../../../../api/user";

import "./ListUsers.scss";

export default function ListUsers(props) {
  const { usersActive, usersInactive } = props;
  const [viewUserActives, setviewUserActives] = useState(true);
  const [isVisibleModal, setisVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  return (
    <div className="list-users">
      <div className="list-users__switch">
        <Switch
          defaultChecked
          onChange={() => setviewUserActives(!viewUserActives)}
        />
        <span>
          {viewUserActives ? "Usuarios actrivos" : "Usuarios Inactivos"}
        </span>
      </div>
      {viewUserActives ? (
        <UsersActive
          userActive={usersActive}
          setisVisibleModal={setisVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
        />
      ) : (
        <UsersInactive usersInactive={usersInactive} />
      )}

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setisVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function UsersActive(props) {
  const {
    userActive,
    setModalTitle,
    setModalContent,
    setisVisibleModal,
  } = props;

  const editUser = (user) => {
    setisVisibleModal(true);
    setModalTitle(
      `Editar ${user.name ? user.name : "NoNombre"} ${
        user.lastname ? user.lastname : "NoApellido"
      }`
    );
    setModalContent(<EditUserForm user={user} />);
  };

  return (
    <List
      className="user-active"
      itemLayout="horizontal"
      dataSource={userActive}
      renderItem={(user) => <UserActive user={user} editUser={editUser} />}
    />
  );
}

function UserActive(props) {
  const { user, editUser } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editUser(user)}>
          <EditFilled />
        </Button>,
        <Button type="danger" onClick={() => console.log("Desactivar Usuario")}>
          <StopFilled />
        </Button>,
        <Button type="danger" onClick={() => console.log("Eliminar Usuariuo")}>
          <DeleteFilled />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`${user.name ? user.name : "..."}
                    ${user.lastName ? user.lastName : "...."}
            `}
        description={user.email}
      />
    </List.Item>
  );
}
function UsersInactive(props) {
  const { usersInactive, setModalContent, setIsVisible } = props;
  return (
    <List
      className="user-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => <UserInactive user={user} />}
    />
  );
}

function UserInactive(props) {
  const { user } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => console.log("Editar Usuariuo")}>
          <CheckSquareFilled />
        </Button>,

        <Button type="danger" onClick={() => console.log("Eliminar Usuariuo")}>
          <DeleteFilled />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`${user.name ? user.name : "..."}
              ${user.lastName ? user.lastName : "...."}
      `}
        description={user.email}
      />
    </List.Item>
  );
}
