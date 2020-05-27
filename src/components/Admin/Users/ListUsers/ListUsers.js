import React, { useState, useEffect } from "react";
import {
  Switch,
  List,
  Avatar,
  Button,
  notification,
  Modal as ModalAntd,
} from "antd";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import {
  EditFilled,
  StopFilled,
  DeleteFilled,
  CheckSquareFilled,
} from "@ant-design/icons";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import {
  getAvatarApi,
  activateUserApi,
  deleteUserApi,
} from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";
import AddUserAdmin from "../AddUserFom";
import "./ListUsers.scss";

const { confirm } = ModalAntd;

export default function ListUsers(props) {
  const { usersActive, usersInactive, setReloadUsers } = props;
  const [viewUserActives, setViewUserActives] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const addUserModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo usuario");
    setModalContent(
      <AddUserAdmin
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  return (
    <div className="list-users">
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <Switch
            defaultChecked
            onChange={() => setViewUserActives(!viewUserActives)}
          />
          <span>
            {viewUserActives ? "Usuarios Activos" : "Usuarios Inactivos"}
          </span>
        </div>
        <Button type="primary" onClick={addUserModal}>
          Nuevo usuario
        </Button>
      </div>
      {viewUserActives ? (
        <UsersActive
          userActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UsersInactive
          usersInactive={usersInactive}
          setReloadUsers={setReloadUsers}
        />
      )}

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
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
    setIsVisibleModal,
    setReloadUsers,
  } = props;

  const editUser = (user) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${user.name ? user.name : "NoNombre"} ${
        user.lastname ? user.lastname : "NoApellido"
      }`
    );
    setModalContent(
      <EditUserForm user={user} setReloadUsers={setReloadUsers} setIsVisibleModal={setIsVisibleModal}/>
    );
  };

  return (
    <List
      className="user-active"
      itemLayout="horizontal"
      dataSource={userActive}
      renderItem={(user) => (
        <UserActive
          user={user}
          editUser={editUser}
          setReloadUsers={setReloadUsers}
        />
      )}
    />
  );
}

function UserActive(props) {
  const { user, editUser, setReloadUsers } = props;
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

  const desactivateUser = () => {
    const token = getAccessTokenApi();

    activateUserApi(token, user._id, false)
      .then((response) => {
        notification["success"]({
          message: response.message,
        });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err.message,
        });
      });
  };

  const showDeleteConfirm = () => {
    const token = getAccessTokenApi();

    confirm({
      title: "Eliminando Usuario",
      content: `Estas seguro que quiere eliminar a ${user.email} ?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(token, user._id)
          .then((response) => {
            notification["success"]({
              message: response.message,
            });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err.message,
            });
          });
      },
    });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editUser(user)}>
          <EditFilled />
        </Button>,
        <Button type="danger" onClick={desactivateUser}>
          <StopFilled />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
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
  const {
    usersInactive,
    setModalContent,
    setIsVisible,
    setReloadUsers,
  } = props;
  return (
    <List
      className="user-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <UserInactive user={user} setReloadUsers={setReloadUsers} />
      )}
    />
  );
}

function UserInactive(props) {
  const { user, setReloadUsers } = props;
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

  const activateUser = () => {
    const token = getAccessTokenApi();

    activateUserApi(token, user._id, true)
      .then((response) => {
        notification["success"]({
          message: response.message,
        });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err.message,
        });
      });
  };

  const showDeleteConfirm = () => {
    const token = getAccessTokenApi();

    confirm({
      title: "Eliminando Usuario",
      content: `Estas seguro que quiere eliminar a ${user.email} ?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(token, user._id)
          .then((response) => {
            notification["success"]({
              message: response.message,
            });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification["success"]({
              message: err.message,
            });
          });
      },
    });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={activateUser}>
          <CheckSquareFilled />
        </Button>,

        <Button type="danger" onClick={showDeleteConfirm}>
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
