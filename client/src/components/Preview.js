import React from "react";
import { useParams, Link } from "react-router-dom";
import { Layout, Menu, Row, Col } from "antd";
import {
  ExperimentOutlined,
  BlockOutlined,
} from "@ant-design/icons";

import logo from "../assets/main-logo.svg";

const { Header, Content } = Layout;

const Preview = () => {
  const { previewId } = useParams();
  React.useEffect(() => {
    //initial load for playground
  }, []);

  return (
    <Layout className="Preview" hasSider>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <Row>
          <Col span={12}>
            <div className="logo">
              <img src={logo} alt="QA" />
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["3"]}>
              <Menu.Item key="1" icon={<ExperimentOutlined />}>
                <Link to={`/playground/${previewId}`}>Playground</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<BlockOutlined />}>
                Preview
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
          ></Col>
        </Row>
      </Header>
      <Content>
          hello
      </Content>
    </Layout>
  );
};

export default Preview;
