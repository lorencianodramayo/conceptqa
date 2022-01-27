import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import ReactCountryFlag from "react-country-flag";
import {
  Layout,
  Menu,
  Breadcrumb,
  Drawer,
  List,
  Row,
  Col,
  Button,
  Divider,
} from "antd";
import Icon, {
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

import { GoogleSvg  } from "../assets/icons";

import { template } from '../reducers/template';
import { counter } from '../reducers/counter';

const GoogleIcon = (props) => <Icon component={GoogleSvg} {...props} />;
const { Header, Content, Sider } = Layout;

const Playground = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { playgroundId, templateId } = useParams();

  const count = useSelector((state) => state.counter.value);
  const temp = useSelector((state) => state.template.value);
  
  const [closeable, setCloseable] = React.useState(true);
  const [templates, setTemplates] = React.useState([]);

  React.useEffect(() => {
    //initial load for playground
    axios
      .get("/PlaygroundAPI/", { params: { id: playgroundId } })
      .then((res) => {
        setTemplates(res.data.templates);
      });
      
    //if has template id
    if (templateId !== undefined) {
        setCloseable(templateId === undefined);

        axios
          .get("/PlaygroundAPI/template", { params: { id: templateId } })
          .then((res) => {
            dispatch(template(res.data));
          });
    }
    
  }, [dispatch, playgroundId, templateId]);

  const showDrawer = () => {
    setCloseable(true);
  };

  const onClose = () => {
    setCloseable(false);
  };
  
  const templateList = (e) => {
    navigate(`/playground/${playgroundId}/template/${e}`);
    dispatch(counter(count + 1));
  }

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
                <Breadcrumb.Item>{temp.name}</Breadcrumb.Item>
                <Breadcrumb.Item>{`${temp.width}x${temp.height}`}</Breadcrumb.Item>
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
            {templateId !== undefined ? <Iframe /> : null}
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
              dataSource={templates}
              renderItem={(item) => (
                <List.Item
                  style={
                    item.templateId === templateId
                      ? { backgroundColor: "#f2207626" }
                      : { backgroundColor: "transparent" }
                  }
                  onClick={() => templateList(item.templateId)}
                >
                  <List.Item.Meta
                    avatar={<GoogleIcon />}
                    title={item.dimension}
                    description={item.name}
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
