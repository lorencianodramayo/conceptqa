import React from "react";
import axios from 'axios';
import Iframe from "react-iframe";
import { useParams, Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Row,
  Col,
  List,
  Card,
  PageHeader,
  Typography,
  Button,
} from "antd";
import {
  ExperimentOutlined,
  BlockOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import logo from "../assets/main-logo.svg";

const { Header, Content } = Layout;

const { Paragraph } = Typography;

const Preview = () => {
  const { previewId } = useParams();
  const [editableStr, setEditableStr] = React.useState("Untitled | February 4, 2022");
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    axios
      .get("/PreviewAPI/", { params: { playgroundId: previewId } })
      .then((res) => {
        setData(res.data)
      });
  }, [previewId]);

  const loaded = (objects, template, e) => {
   e.target.contentWindow.postMessage(
     objects,
     `https://storage.googleapis.com/${template.url}/${
       template.uid
     }/${decodeURIComponent(template.directory)}/index.html`
   );
  };

  const editName = (e, info, index) => {
    let newArr = [...data];
    newArr[index].variantName = e;
    axios
      .put("/PreviewAPI/update", {
        _id: info._id,
        data: {
          variantName: e,
        },
      })
      .then((res) => setData(newArr));
  }

  const deleteVariant = (e, info) => {
    axios
      .put("/PreviewAPI/delete", {
        _id: info._id,
      })
      .then((res) => setData(data.filter(({ _id }) => _id !== info._id)));
  }

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
                display: "none",
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
              renderItem={(item, index) => (
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
                          minWidth: "50vw",
                          alignItems: "center",
                        }}
                      >
                        <Iframe
                          width={item.template.width}
                          height={item.template.height}
                          className="iframe"
                          name="preview-iframe"
                          onLoad={(e) =>
                            loaded(item.defaultValues, item.template, e)
                          }
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
                                  editable={{
                                    onChange: (e) => editName(e, item, index),
                                  }}
                                  style={{ margin: 0 }}
                                >
                                  {item.variantName}
                                </Paragraph>
                              </Col>
                              <Col span={24}>
                                <Row>
                                  <Col
                                    span={12}
                                  >{`${item.template.width}x${item.template.height}`}</Col>
                                  <Col
                                    span={12}
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    {" "}
                                    <Button
                                      type="link"
                                      icon={<DeleteOutlined />}
                                      size="small"
                                      onClick={(e) => deleteVariant(e, item)}
                                    />
                                  </Col>
                                </Row>
                              </Col>
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
