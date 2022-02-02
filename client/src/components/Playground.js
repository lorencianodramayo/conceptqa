import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
//import ReactCountryFlag from "react-country-flag";
import {
  Layout,
  Menu,
  Breadcrumb,
  Drawer,
  List,
  Row,
  Col,
  Button,
} from "antd";
import Icon, {
  ExperimentOutlined,
  LayoutOutlined,
  BlockOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

import Iframe from "./Iframe";
import Sidebar from "./Sidebar";
import logo from "../assets/main-logo.svg";

import { GoogleSvg  } from "../assets/icons";

import { template } from '../reducers/template';
import { sidePanel } from "../reducers/sidePanel";
import { objectDynamic } from "../reducers/objectDynamic";
import { imageList } from "../reducers/imageList";

const GoogleIcon = (props) => <Icon component={GoogleSvg} {...props} />;
const { Header, Content, Sider } = Layout;

const Playground = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { playgroundId, templateId } = useParams();

  const temp = useSelector((state) => state.template.value);
  const side = useSelector((state) => state.sidePanel.value);
  const objects = useSelector((state) => state.objectDynamic.value);
  const imgList = useSelector((state) => state.imageList.value);
  
  const [closeable, setCloseable] = React.useState(true);
  const [templates, setTemplates] = React.useState([]);

  React.useEffect(() => {
    //initial load for playground
    axios
      .get("/PlaygroundAPI/", { params: { id: playgroundId } })
      .then((res) => {
        setTemplates(res.data.templates);
      });

    if (imgList !== undefined) {
      if(imgList.length <=0){
        axios.get("/PlaygroundAPI/templateAll").then((res) => {
          dispatch(imageList(res.data));
        });
      }
    }

    if (templateId !== undefined) {
      //if has template id
      setCloseable(templateId === undefined);

      axios
        .get("/PlaygroundAPI/template", { params: { id: templateId } })
        .then((res) => {
          dispatch(template(res.data));
          dispatch(objectDynamic(res.data.defaultValues));
        });
    } else {
      dispatch(template({}));
      dispatch(objectDynamic({}));
    }
  }, [dispatch, imgList, playgroundId, templateId]);

  const showDrawer = () => {
    setCloseable(true);
    dispatch(sidePanel(true));
  };

  const onClose = () => {
    setCloseable(false);
    dispatch(sidePanel(false));
  };
  
  const templateList = (e) => {
    navigate(`/playground/${playgroundId}/template/${e}`);
  }

  const showSidePanel = () => {
      dispatch(sidePanel(!side));
  }

  const showPanels = () => {
    dispatch(sidePanel(true));
  }

  return (
    <Layout className="Playground" hasSider>
      {templateId !== undefined ? (
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <Row>
            <Col span={12}>
              <div className="logo">
                <img src={logo} alt="QA" />
              </div>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                onClick={showPanels}
              >
                <Menu.Item key="1" icon={<ExperimentOutlined />}>
                  Playground
                </Menu.Item>
                {/* <Menu.Item key="2" icon={<PictureOutlined />}>
                  Assets
                </Menu.Item> */}
                <Menu.Item key="3" icon={<BlockOutlined />}>
                  <Link to={`/preview/${playgroundId}`}>Preview</Link>
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
                type="primary"
                loading={
                  objects !== undefined
                    ? Object.keys(objects).length <= 0
                      ? true
                      : false
                    : true
                }
                icon={<LayoutOutlined />}
                onClick={showDrawer}
              />
            </Col>
          </Row>
        </Header>
      ) : null}
      <Sider
        trigger={null}
        collapsible
        collapsed={side}
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
          {temp.width !== undefined ? (
            <Row style={{ width: "100%", position: "fixed" }}>
              <Col span={12} className="breadcrumbs">
                <Button
                  type="link"
                  icon={!side ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                  onClick={showSidePanel}
                />
                <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>{temp.name}</Breadcrumb.Item>
                  <Breadcrumb.Item>{`${temp.width}x${temp.height}`}</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
            </Row>
          ) : null}

          {templateId !== undefined ? (
            <div className="site-layout-content">
              <Iframe />
            </div>
          ) : null}
          <Drawer
            title="Creative Templates"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={closeable}
            maskClosable={templateId !== undefined}
            getContainer={false}
            maskStyle={
              templateId !== undefined
                ? { backgroundColor: "#5c18ff78" }
                : {
                    backgroundImage: "url(https://source.unsplash.com/1600x900/?code)",
                  }
            }
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
