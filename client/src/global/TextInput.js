import React from "react";
import { useSelector, useDispatch } from "react-redux";
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

import { counter } from "../reducers/counter";
import { objectDynamic } from "../reducers/objectDynamic";
import { playPause } from "../reducers/playPause";

const { Panel } = Collapse;

const UpperCaseIcon = (props) => <Icon component={UpperCaseSvg} {...props} />;
const LowerCaseIcon = (props) => <Icon component={LowerCaseSvg} {...props} />;
const SentenceCaseIcon = (props) => (
  <Icon component={SentenceCaseSvg} {...props} />
);

const TextInput = (props) => {
  const cases = useSelector((state) => state.caseView.value);
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const cSelected = useSelector((state) => state.caseSelected.value);
  const sLanguage = useSelector((state) => state.selectedLanguage.value);

  const [timer, setTimer] = React.useState(null);
  const [caseSelect, setCaseSelect] = React.useState(null);

  React.useEffect(() => {
    setCaseSelect(cSelected);
  }, [cSelected]);

  const textCase = (label, text, settings) => {
    switch(settings){
      case 'sentence':
        props.forms.setFieldsValue({
          [`${label}`]: text.replace(/\.\s+([a-z])[^.]|^(\s*[a-z])[^.]/g, (s) =>
            s.replace(/([a-z])/, (s) => s.toUpperCase())
          ),
        });
      break;
      case 'upper':
        props.forms.setFieldsValue({
          [`${label}`]: text.toUpperCase(),
        });
      break;
      case 'lower':
        props.forms.setFieldsValue({
          [`${label}`]: text.toLowerCase(),
        });
      break;
      default: 
        console.log('');
      break;
    }

    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      dispatch(objectDynamic(props.forms.getFieldsValue()));
      dispatch(counter(count + 1));
      dispatch(playPause({ paused: true, visible: false }));
      setTimer(newTimer);
    }, 2000);

    setCaseSelect(settings)
  }

  const setText = (label, number) => {
    props.forms.setFieldsValue({
      [`${label}`]: sLanguage.substring(0, number),
    });
    
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      dispatch(objectDynamic(props.forms.getFieldsValue()));
      dispatch(counter(count + 1));
      dispatch(playPause({ paused: true, visible: false }));
      setTimer(newTimer);
    }, 2000);
  }

  return (
    <React.Fragment>
      <Form.Item
        required
        name={props.label}
        className="label"
        label={props.label}
      >
        <Input />
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
              <Radio.Group
                size="small"
                value={caseSelect}
                onChange={(e) =>
                  textCase(props.label, props.content, e.target.value)
                }
              >
                <Radio.Button value="sentence">
                  <SentenceCaseIcon />
                </Radio.Button>
                <Radio.Button value="upper">
                  <UpperCaseIcon />
                </Radio.Button>
                <Radio.Button value="lower">
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
                  disabled={sLanguage === ""}
                  onChange={(e) =>
                    setText(props.label, e)
                  }
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
