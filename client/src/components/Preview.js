import React from "react";
import axios from 'axios';
import Iframe from "react-iframe";
import { useParams, Link } from "react-router-dom";
import { Layout, Menu, Row, Col, List, Card, PageHeader, Typography } from "antd";
import {
  ExperimentOutlined,
  BlockOutlined,
} from "@ant-design/icons";

import logo from "../assets/main-logo.svg";

const { Header, Content } = Layout;

const { Paragraph } = Typography;

const Preview = () => {
  const { previewId } = useParams();
  const [editableStr, setEditableStr] = React.useState("Untitled | February 2, 2022");
  const [editableName, setEditableName] = React.useState(
    "Ad-Lib QA | Specsavers"
  );
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    axios
      .get("/PreviewAPI/", { params: { playgroundId: previewId } })
      .then((res) => {
        setData(res.data)
      });
  }, [previewId]);

  return (
    <Layout className="Preview">
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
      <Content style={{ marginTop: "56px" }}>
        <Row style={{ padding: "1em" }} gutter={[0, 16]}>
          <Col span={24}>
            <PageHeader
              className="site-page-header"
              title={
                <Row>
                  <Col span={12}>
                    <Paragraph
                      editable={{ onChange: setEditableStr }}
                      style={{ margin: 0 }}
                    >
                      {editableStr}
                    </Paragraph>
                  </Col>
                  <Col span={12}></Col>
                </Row>
              }
              style={{
                border: "1px solid rgb(235, 237, 240)",
                boxShadow: "rgb(208 216 243 / 60%) 0 3px 6px 0px",
              }}
            />
          </Col>
          <Col span={24}>
            <List
              size="large"
              bordered
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                defaultPageSize: 5,
                total: data.length,
                showSizeChanger: true,
                pageSizeOptions: [5, 10, 20, 50, 100],
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Row
                    style={{
                      maxWidth: "90vw",
                      boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
                    }}
                  >
                    <Col span={24}>
                      <Card
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          minHeight: "33em",
                          alignItems: "center",
                        }}
                      >
                        <Iframe
                          width={item.template.width}
                          height={item.template.height}
                          className="iframe"
                          url={`https://storage.googleapis.com/${item.template.url}/${item.template.uid}/${item.template.directory}/index.html`}
                        />
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Row>
                        <Col span={24}>
                          <Card
                            bordered={false}
                            style={{
                              backgroundColor: "#f6f6f6",
                              width: "100%",
                            }}
                          >
                            <Row>
                              <Col span={12}>
                                <Paragraph
                                  editable={{ onChange: setEditableName }}
                                  style={{ margin: 0 }}
                                >
                                  {editableName}
                                </Paragraph>
                              </Col>
                              <Col span={24}>{`${item.template.width}x${item.template.height}`}</Col>
                            </Row>
                          </Card>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Preview;
