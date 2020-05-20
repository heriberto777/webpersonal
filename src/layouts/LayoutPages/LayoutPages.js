import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import routes from "../../config/routes";

export default function LayoutPages(props) {
  const { routes } = props;
  const { Header, Footer, Content } = Layout;
  return (
    <Layout>
      <h2>Menu Sider</h2>
      <Layout>
        <Content>
          <LoadRoutes routes={routes} />
        </Content>
        <Footer>
          <h5>Heriberto Gonzalez Jaquez</h5>
        </Footer>
      </Layout>
    </Layout>
  );
}

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.component}
      />
      ))}
    </Switch>
  );
}
