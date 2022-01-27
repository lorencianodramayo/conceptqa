import React from "react";
import ReactCountryFlag from "react-country-flag";
import {
  Layout,
  Menu,
  Breadcrumb,
  Drawer,
  List,
  Avatar,
  Row,
  Col,
  Button,
  Divider,
} from "antd";
import {
  ExperimentOutlined,
  PictureOutlined,
  LayoutOutlined,
  BlockOutlined,
  EyeFilled,
} from "@ant-design/icons";

import Iframe from "./Iframe";
import Sidebar from "./Sidebar";
import Tselect from "./Tselect";
import logo from "../assets/main-logo.svg";

const { Header, Content, Sider } = Layout;

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const Playground = () => {
  const [closeable, setCloseable] = React.useState(true);

  const showDrawer = () => {
    setCloseable(true);
  };

  const onClose = () => {
    setCloseable(false);
  };

  return (
    <Layout className="Playground" hasSider>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <Row>
          <Col span={12}>
            <div className="logo">
              <img src={logo} alt="QA" />
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<ExperimentOutlined />}>
                Playground
              </Menu.Item>
              <Menu.Item key="2" icon={<PictureOutlined />}>
                Assets
              </Menu.Item>
              <Menu.Item key="3" icon={<BlockOutlined />}>
                Tearsheet
              </Menu.Item>
            </Menu>
          </Col>
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "0 1em",
            }}
          >
            <Button
              type="link"
              icon={<ReactCountryFlag countryCode="IT" svg />}
            />
          </Col>
        </Row>
      </Header>
      <Sider
        trigger={null}
        collapsible
        collapsed={closeable}
        collapsedWidth={0}
        theme="light"
        width={350}
        style={{
          overflow: "auto",
          height: "100vh",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Sidebar />
      </Sider>

      <Layout
        className="site-layout"
        style={{ marginTop: 28, backgroundColor: "#fff" }}
      >
        <Content style={{ margin: "20px 16px 0", overflow: "initial" }}>
          <Row>
            <Col span={12}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Penzoil</Breadcrumb.Item>
                <Breadcrumb.Item>300x600</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col
              span={12}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button type="link" icon={<EyeFilled />} />
              <Tselect />
              <Divider type="vertical" />
              <Button
                type="primary"
                icon={<LayoutOutlined />}
                onClick={showDrawer}
              />
            </Col>
          </Row>
          <div className="site-layout-content">
            <Iframe />
          </div>

          <Drawer
            title="Creative Templates"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={closeable}
            getContainer={false}
            maskStyle={{ backgroundColor: "#5c18ff78" }}
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item onClick={() => console.log(item.title)}>
                  <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={item.title}
                    description="300x250"
                  />
                </List.Item>
              )}
            />
          </Drawer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Playground;
