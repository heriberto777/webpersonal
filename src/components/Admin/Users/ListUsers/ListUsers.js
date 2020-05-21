import React, { useState } from "react";
import { Switch, List, Avatar, Button } from "antd";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import {
  EditFilled,
  StopFilled,
  DeleteFilled,
  CheckSquareFilled,
} from "@ant-design/icons";
import Modal from "../../../Modal";

import "./ListUsers.scss";

export default function ListUsers(props) {
  const { usersActive, usersInactive } = props;
  const [viewUserActives, setviewUserActives] = useState(true);
  const [isVisibleModal, setisVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setmodalContent] = useState("");

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
          setmodalContent={setmodalContent}
        />
      ) : (
        <UsersInactive usersInactive={usersInactive} />
      )}

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setisVisibleModal}
      >
        Hola este es mi primer modal
      </Modal>
    </div>
  );
}

function UsersActive(props) {
  const { userActive, setModalTitle, setmodalContent, setisVisibleModal} = props;

  const editUser = user => {
    setisVisibleModal(true)
  }

  return (
    <List
      className="user-active"
      itemLayout="horizontal"
      dataSource={userActive}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => editUser(user._id)}
            >
              <EditFilled />
            </Button>,
            <Button
              type="danger"
              onClick={() => console.log("Desactivar Usuario")}
            >
              <StopFilled />
            </Button>,
            <Button
              type="danger"
              onClick={() => console.log("Eliminar Usuariuo")}
            >
              <DeleteFilled />
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
            title={`${user.name ? user.name : "..."}
                    ${user.lastName ? user.lastName : "...."}
            `}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
}

function UsersInactive(props) {
  const { usersInactive } = props;
  return (
    <List
      className="user-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => console.log("Editar Usuariuo")}
            >
              <CheckSquareFilled />
            </Button>,

            <Button
              type="danger"
              onClick={() => console.log("Eliminar Usuariuo")}
            >
              <DeleteFilled />
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
            title={`${user.name ? user.name : "..."}
                    ${user.lastName ? user.lastName : "...."}
            `}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
}
