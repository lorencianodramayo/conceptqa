import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Image,
  Modal,
  Switch,
  Collapse,
  Radio,
  Row,
  Col,
  InputNumber,
  Checkbox,
  Space,
  Divider,
} from "antd";
import Icon, {
  HighlightOutlined,
  FileImageOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons";

import { UpperCaseSvg, LowerCaseSvg, SentenceCaseSvg } from "../assets/icons";

const { Panel } = Collapse;
const { Option } = Select;

const UpperCaseIcon = (props) => <Icon component={UpperCaseSvg} {...props} />;
const LowerCaseIcon = (props) => <Icon component={LowerCaseSvg} {...props} />;
const SentenceCaseIcon = (props) => (
  <Icon component={SentenceCaseSvg} {...props} />
);

const Sidebar = () => {
  const [form] = Form.useForm();

  const temp = useSelector((state) => state.template.value);
  
  const [modal2Visible, setModal2Visible] = React.useState(false);
  const [showImages, setShowImages] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState(0);

  const onSwitchChange = () => {
    setShowImages(!showImages);
  };

  return (
    <React.Fragment>
      {Object.keys(temp).includes("defaultValues") ? (
        <div className="Sidebar">
          <Card
            title={`${Object.keys(temp.defaultValues).length} Dynamic Elements`}
            extra={
              <Switch
                size="small"
                checkedChildren={<FileImageOutlined />}
                unCheckedChildren={<FileImageOutlined />}
                onChange={onSwitchChange}
              />
            }
          >
            <Form form={form} layout="vertical">
              <Form.Item
                name="frame1Headline"
                className="label"
                label={
                  <Row>
                    <Col span={9}>frame1Headline</Col>
                    <Col span={7} offset={8}>
                      <Button
                        icon={
                          activeKey === 1 ? (
                            <MinusSquareOutlined />
                          ) : (
                            <PlusSquareOutlined />
                          )
                        }
                        size="small"
                        type={activeKey === 1 ? "link" : "text"}
                        onClick={() => setActiveKey(activeKey === 1 ? 0 : 1)}
                      />
                    </Col>
                  </Row>
                }
              >
                <Collapse
                  bordered={false}
                  activeKey={activeKey}
                  expandIconPosition="right"
                  ghost={true}
                >
                  <Panel
                    showArrow={false}
                    header={<Input placeholder="Lorem Ipsum" />}
                    key={1}
                  >
                    <Row>
                      <Col span={9}>
                        <Radio.Group
                          size="small"
                          onBlur={() => console.log("hello")}
                        >
                          <Radio.Button value="a">
                            <SentenceCaseIcon />
                          </Radio.Button>
                          <Radio.Button value="b">
                            <UpperCaseIcon />
                          </Radio.Button>
                          <Radio.Button value="c">
                            <LowerCaseIcon />
                          </Radio.Button>
                        </Radio.Group>
                      </Col>
                      <Col span={12} offset={2}>
                        <Space>
                          <InputNumber
                            min={1}
                            defaultValue={16}
                            placeholder="Max"
                            size="small"
                            style={{ width: "70px" }}
                          />
                          <Divider type="vertical" />
                          <Checkbox>Min</Checkbox>
                        </Space>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
              </Form.Item>
              <Form.Item name="select" label="customVariable">
                <Select placeholder="Please select a country">
                  <Option value="china">China</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="image"
                label="frame1Image"
                style={!showImages ? { display: "none" } : { display: "flex" }}
              >
                <Button type="dashed" onClick={() => setModal2Visible(true)}>
                  <div style={{ padding: "0.2em" }}>
                    <Image
                      preview={{ visible: false, mask: <HighlightOutlined /> }}
                      src="https://storage.googleapis.com/adlib-showcase-bucket/dca6d0b0-325d-11ec-8ac8-eb2c74bb0290/300x600-AAP/prod1.png"
                    />
                  </div>
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <Modal
            title="Asset Library"
            centered
            visible={modal2Visible}
            onOk={() => setModal2Visible(false)}
            onCancel={() => setModal2Visible(false)}
            closable={false}
            width={1000}
            bodyStyle={{ height: "80vh" }}
            footer={null}
            maskStyle={{ backgroundColor: "#5c18ff78" }}
          >
            <Image
              width={200}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </Modal>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Sidebar;
