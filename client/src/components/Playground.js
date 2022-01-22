import React from 'react';
import { Layout, Menu, Breadcrumb, Drawer, List, Avatar, Row, Col } from "antd";
import { BuildOutlined } from "@ant-design/icons";

import Iframe from './Iframe';
import Sidebar from "./Sidebar";
import logo from '../assets/main-logo.svg'

const { Header, Content } = Layout;

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

    // const showDrawer = () => {
    //   setCloseable(true);
    // };

   const onClose = () => {
      setCloseable(false);
    };

  return (
    <Layout className="Playground">
      <Header>
        <div className="logo">
          <img src={logo} alt="QA" />
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<BuildOutlined />}>
            Playground
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Row>
          <Col span={6}>
              <Sidebar/>
          </Col>
          <Col span={18} style={{padding: '0 1em'}}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Penzoil</Breadcrumb.Item>
              <Breadcrumb.Item>300x600</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">
                <Iframe />
            </div>
          </Col>
        </Row>

        <Drawer
          title="Creative Templates"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={closeable}
          getContainer={false}
          style={{ position: "absolute" }}
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
  );
};

export default Playground;
