import React from "react";
import { useSelector } from "react-redux";
import {
  Form,
  Input,
  Collapse,
  Radio,
  Row,
  Col,
  InputNumber,
  Space,
} from "antd";
import Icon, {
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
  const cases = useSelector((state) => state.caseView.value);
  return (
    <React.Fragment>
      <Form.Item
        required
        name={props.label}
        className="label"
        label={props.label}
      >
        <Input showCount={true}/>
      </Form.Item>

      <Collapse
        bordered={false}
        activeKey={cases}
        expandIconPosition="right"
        ghost={true}
      >
        <Panel showArrow={false} header={null} key={1}>
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
                  value={
                    props.content !== undefined
                      ? props.content.split("").length
                      : null
                  }
                  placeholder="Max"
                  size="small"
                  style={{ width: "100px" }}
                />
              </Space>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </React.Fragment>
  );
};

export default TextInput;
