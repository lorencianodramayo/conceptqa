import React from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Tooltip,
  Popover,
  Radio,
  Menu,
  Modal,
} from "antd";

import Icon, {
  PictureOutlined,
  FontSizeOutlined,
  SaveOutlined,
  TranslationOutlined,
  StrikethroughOutlined,
  CloseCircleFilled,
  AppstoreAddOutlined,
} from "@ant-design/icons";

//svg icons
import { UpperCaseSvg, LowerCaseSvg, SentenceCaseSvg } from "../assets/icons";

//globals
import TextInput from "../global/TextInput";
import NormalText from "../global/NormalText";
import Selection from "../global/Selection";
import ImageSelection from "../global/ImageSelection";
import AddLanguage from "../global/AddLanguage";

//reducers
import { counter } from "../reducers/counter";
import { imageView } from '../reducers/imageView';
import { caseView } from '../reducers/caseView';
import { objectDynamic } from '../reducers/objectDynamic';
import { caseSelected } from "../reducers/caseSelected";
import { playPause } from "../reducers/playPause";
import { splitMin } from "../reducers/splitMin";
import { selectedLanguage } from "../reducers/selectedLanguage";

const UpperCaseIcon = (props) => <Icon component={UpperCaseSvg} {...props} />;
const LowerCaseIcon = (props) => <Icon component={LowerCaseSvg} {...props} />;
const SentenceCaseIcon = (props) => (
  <Icon component={SentenceCaseSvg} {...props} />
);

const Sidebar = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const temp = useSelector((state) => state.template.value);
  const image = useSelector((state) => state.imageView.value);
  const cases = useSelector((state) => state.caseView.value);
  const objects = useSelector((state) => state.objectDynamic.value);
  const count = useSelector((state) => state.counter.value);
  const sMin = useSelector((state) => state.splitMin.value);
  const sLanguage = useSelector((state) => state.selectedLanguage.value);

  const [timer, setTimer] = React.useState(null);
  const [gSettings, setGSettings] = React.useState(false);
  const [addLanguage, setAddLaungage] = React.useState(false)
  const [languageList, setLanguageList] = React.useState([])

  React.useEffect(() => {
      form.setFieldsValue(objects)
  }, [dispatch, form, objects, temp]);

  const showImages = () => {
    dispatch(imageView(!image));
  }

  const showTextSettings = () => {
    dispatch(caseView(cases === 0 ? 1 : 0));
    setGSettings(!cases? true : false);
  }

  const savePreview = () => {

  }

  const viewLanguage = () => {
    setGSettings(false);;
    axios.get("/LanguageAPI/languageAll").then((res) => {
      setLanguageList(res.data)
    });
  }

  const UpdateDynamicElements = (e, l) => {
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
        dispatch(objectDynamic(l));
        dispatch(counter(count + 1));
    }, 2000);

    setTimer(newTimer);
  }

  const globalCase = (e, type) => {
    let obj = {};

    Object.keys(form.getFieldValue()).map((data, index) => {
      if(["text", "disclaimer", "legal", "headline", "price", "currency"].some(
        (t) => data.toLowerCase().includes(t))){
          
          if(!data.toLowerCase().includes("color")){
            if(type === "case"){
              switch (e.target.value) {
                case "sentence":
                  obj[data] = form
                    .getFieldValue()
                    [data].toLowerCase()
                    .replace(/\.\s+([a-z])[^.]|^(\s*[a-z])[^.]/g, (s) =>
                      s.replace(/([a-z])/, (s) => s.toUpperCase())
                    );
                  break;
                case "upper":
                  obj[data] = form.getFieldValue()[data].toUpperCase();
                  break;
                case "lower":
                  obj[data] = form.getFieldValue()[data].toLowerCase();
                  break;
                default:
                  console.log("hello");
                  break;
              }
            }else{
              if(!sMin.active){
                dispatch(
                  splitMin({ active: true, dynamic: form.getFieldValue() })
                );
                obj[data] = form
                  .getFieldValue()
                  [data].substring(0, form.getFieldValue()[data].split('').length / 2)
              }else{
                obj = sMin.dynamic;
                dispatch(
                  splitMin({ active: false, dynamic: {} })
                );
              }
              
            }
          }
        }
        return index;
    });

    form.setFieldsValue(obj);
    dispatch(caseSelected(e.target.value));

    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      dispatch(objectDynamic(form.getFieldsValue()));
      dispatch(counter(count + 1));
      dispatch(playPause({ paused: true, visible: false }));
      setTimer(newTimer);
    }, 1000);
  }

  const setCopies = (e) => {
   //let title = e.item.props.title;
   dispatch(selectedLanguage(e.domEvent.target.title));
  }

  return (
    <React.Fragment>
      {objects !== undefined ? (
        <div className="Sidebar">
          <div className="sideButtons">
            <Row>
              <Col>
                <Tooltip placement="right" title="Show Images">
                  <Button
                    type={!image ? "default" : "primary"}
                    icon={<PictureOutlined />}
                    size="small"
                    onClick={showImages}
                  />
                </Tooltip>
              </Col>
              <Col>
                <Tooltip
                  placement="right"
                  title={gSettings ? null : "Text Settings"}
                >
                  <Popover
                    placement="rightTop"
                    title="Global Text Case"
                    content={
                      <div>
                        <Radio.Group onChange={(e) => globalCase(e, "case")}>
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
                        <Button
                          type="link"
                          icon={<CloseCircleFilled />}
                          onClick={() => setGSettings(false)}
                        />
                      </div>
                    }
                    visible={gSettings}
                  >
                    <Button
                      type={cases === 0 ? "default" : "primary"}
                      icon={<FontSizeOutlined />}
                      size="small"
                      onClick={showTextSettings}
                    />
                  </Popover>
                </Tooltip>
              </Col>
              <Col>
                <Tooltip placement="right" title="Minimum Character">
                  <Button
                    type={sMin.active ? "primary" : "default"}
                    icon={<StrikethroughOutlined />}
                    size="small"
                    onClick={(e) => globalCase(e, "minimum")}
                  />
                </Tooltip>
              </Col>
              <Col>
                <Tooltip placement="right" title="Language">
                  <Popover
                    placement="right"
                    title={
                      <Row>
                        <Col span={18}>Select Language</Col>
                        <Col
                          span={6}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            type="link"
                            size="small"
                            icon={<AppstoreAddOutlined />}
                            onClick={() => setAddLaungage(!addLanguage)}
                          />
                        </Col>
                      </Row>
                    }
                    content={
                      <Menu onClick={setCopies}>
                        {languageList.map((data, index) => {
                          return (
                            <Menu.Item key={index} title={data.copies}>
                              {data.name}
                            </Menu.Item>
                          );
                        })}
                      </Menu>
                    }
                    trigger="click"
                    overlayClassName="language"
                  >
                    <Button
                      type={sLanguage === '' ? "default" : "primary"}
                      icon={<TranslationOutlined />}
                      size="small"
                      onClick={viewLanguage}
                    />
                  </Popover>
                  <Modal
                    title="Add new Language"
                    centered
                    visible={addLanguage}
                    onOk={() => setAddLaungage(false)}
                    onCancel={() => setAddLaungage(false)}
                    footer={null}
                  >
                    <AddLanguage />
                  </Modal>
                </Tooltip>
              </Col>
              <Col>
                <Tooltip placement="right" title="Add to Preview">
                  <Button
                    type="default"
                    icon={<SaveOutlined />}
                    size="small"
                    onClick={savePreview}
                  />
                </Tooltip>
              </Col>
            </Row>
          </div>
          {/* content */}
          <Card title={`${Object.keys(objects).length} Dynamic Elements`}>
            <Form
              form={form}
              layout="vertical"
              onValuesChange={UpdateDynamicElements}
            >
              {Object.keys(objects).length > 0
                ? Object.keys(objects).map((dv, index) => {
                    if (
                      [
                        "image",
                        "logo",
                        "img",
                        "background",
                        "roundel",
                        "video",
                        "audio",
                        "packshot",
                      ].some((t) => dv.toLowerCase().includes(t))
                    ) {
                      return (
                        <ImageSelection
                          label={dv}
                          url={objects[dv]}
                          key={index}
                          forms={form}
                        />
                      );
                    } else {
                      if (
                        [
                          "text",
                          "disclaimer",
                          "legal",
                          "headline",
                          "price",
                          "currency",
                        ].some((t) => dv.toLowerCase().includes(t))
                      ) {
                        return !dv.toLowerCase().includes("color") ? (
                          <TextInput
                            label={dv}
                            content={objects[dv]}
                            key={index}
                            forms={form}
                          />
                        ) : (
                          <NormalText
                            label={dv}
                            content={objects[dv]}
                            key={index}
                          />
                        );
                      } else {
                        return temp.possibleValues !== undefined ? (
                          typeof temp.possibleValues[dv] !== "undefined" ||
                          temp.possibleValues[dv] !== undefined ? (
                            <Selection
                              label={dv}
                              options={temp.possibleValues[dv]}
                              content={objects[dv]}
                              key={index}
                            />
                          ) : (
                            <NormalText
                              label={dv}
                              content={objects[dv]}
                              key={index}
                            />
                          )
                        ) : (
                          <NormalText
                            label={dv}
                            content={objects[dv]}
                            key={index}
                          />
                        );
                      }
                    }
                  })
                : null}
            </Form>
          </Card>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Sidebar;
