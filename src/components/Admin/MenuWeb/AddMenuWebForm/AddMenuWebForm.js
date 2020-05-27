import React, { useState } from "react";
import { Form, Input, Button, Select, notification } from "antd";
import {
  EditFilled,
  StopFilled,
  DeleteFilled,
  CheckSquareFilled,
} from "@ant-design/icons";
import { addMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";

import "./AddMenuWebForm.scss";
export default function AddMenuWebForm(props) {
  const { setIsVisibleModal, setReloadMenuWeb } = props;
  const [menuWebData, setMenuWebData] = useState({});

  const addMenu = () => {
    let finalData = {
      title: menuWebData.title,
      url: (menuWebData.http ? menuWebData.http : "http://") + menuWebData.url,
    };
    if (!finalData.title || !finalData.url || !finalData.url) {
      notification["error"]({
        message: "Todos los campos son oglitarios.",
      });
    } else {
      const token = getAccessTokenApi();
      finalData.active = false;
      finalData.order = 1000;

      addMenuApi(token, finalData)
        .then((response) => {
          notification["success"]({
            message: response, //"Menu agregado correctamente.",
          });
          setIsVisibleModal(false);
          setReloadMenuWeb(true);
          setMenuWebData({});
          finalData = {};
        })
        .catch((err) => {
          //   notification["error"]({
          //     message: "Error en el servidor.",
          //   });
          console.log(err);
        });
    }
  };

  return (
    <div className="add-menu-web-form">
      <AddForm
        menuWebData={menuWebData}
        setMenuWebData={setMenuWebData}
        addMenu={addMenu}
      />
    </div>
  );
}

function AddForm(props) {
  const { menuWebData, setMenuWebData, addMenu } = props;
  const { Option } = Select;

  const selectBefore = (
    <Select
      defaultValue="http://"
      style={{ width: 90 }}
      onChange={(e) => setMenuWebData({ ...menuWebData, http: e })}
    >
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  return (
    <Form className="form-add" onFinish={addMenu}>
      <Form.Item>
        <Input
          prefix=""
          placeholder="Titulo"
          onChange={(e) =>
            setMenuWebData({ ...menuWebData, title: e.target.value })
          }
          value={menuWebData.title}
        />
      </Form.Item>
      <Form.Item>
        <Input
          addonBefore={selectBefore}
          placeholder="URL"
          onChange={(e) =>
            setMenuWebData({ ...menuWebData, url: e.target.value })
          }
          value={menuWebData.url}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear Menu
        </Button>
      </Form.Item>
    </Form>
  );
}
