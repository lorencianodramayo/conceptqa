import React from "react";
import {
  Form,
  Input,
  Button,
  Collapse,
  Radio,
  Row,
  Col,
  InputNumber,
  Space,
} from "antd";
import Icon, {
  PlusSquareOutlined,
  MinusSquareOutlined,
  MediumOutlined,
} from "@ant-design/icons";

import { UpperCaseSvg, LowerCaseSvg, SentenceCaseSvg } from "../assets/icons";

const { Panel } = Collapse;

const UpperCaseIcon = (props) => <Icon component={UpperCaseSvg} {...props} />;
const LowerCaseIcon = (props) => <Icon component={LowerCaseSvg} {...props} />;
const SentenceCaseIcon = (props) => (
  <Icon component={SentenceCaseSvg} {...props} />
);

const TextInput = (props) => {
  const [activeKey, setActiveKey] = React.useState(0);
  return (
    <React.Fragment>
      <Form.Item
        name={props.label}
        className="label"
        label={
          <Row>
            <Col span={9}>{props.label}</Col>
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
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Collapse
          bordered={false}
          activeKey={activeKey}
          expandIconPosition="right"
          ghost={true}
        >
          <Panel
            showArrow={false}
            header={<Input value={props.content} />}
            key={1}
          >
            <Row>
              <Col span={12}>
                <Radio.Group size="small" onBlur={() => console.log("hello")}>
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
              <Col
                span={12}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Space>
                  <InputNumber
                    addonBefore={<MediumOutlined />}
                    min={1}
                    value={props.content.split("").length}
                    placeholder="Max"
                    size="small"
                    style={{ width: "110px" }}
                  />
                </Space>
              </Col>
            </Row>
          </Panel>
        </Collapse>
      </Form.Item>
    </React.Fragment>
  );
};

export default TextInput;
