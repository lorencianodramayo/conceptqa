import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Button, Row, Col, Tooltip, Popover, Radio } from "antd";

import Icon, {
  PictureOutlined,
  FontSizeOutlined,
  SaveOutlined,
  TranslationOutlined,
  StrikethroughOutlined,
} from "@ant-design/icons";

//svg icons
import { UpperCaseSvg, LowerCaseSvg, SentenceCaseSvg } from "../assets/icons";

//globals
import TextInput from "../global/TextInput";
import NormalText from "../global/NormalText";
import Selection from "../global/Selection";
import ImageSelection from "../global/ImageSelection";

//reducers
import { counter } from "../reducers/counter";
import { imageView } from '../reducers/imageView';
import { caseView } from '../reducers/caseView';
import { objectDynamic } from '../reducers/objectDynamic';

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

  const [timer, setTimer] = React.useState(null);

  React.useEffect(() => {
      form.setFieldsValue(objects)
  }, [dispatch, form, objects, temp]);


  
  const showImages = () => {
    dispatch(imageView(!image));
  }

  const showTextSettings = () => {
    dispatch(caseView(cases === 0 ? 1 : 0));
  }

  const savePreview = () => {

  }

  const UpdateDynamicElements = (e, l) => {
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
        dispatch(objectDynamic(l));
        dispatch(counter(count + 1));
    }, 2000);

    setTimer(newTimer);
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
                  title={cases ? null : "Text Settings"}
                >
                  <Popover
                    placement="rightTop"
                    title="Global Text Case"
                    content={
                      <Radio.Group>
                        <Radio.Button value="Aa">
                          <SentenceCaseIcon />
                        </Radio.Button>
                        <Radio.Button value="AA">
                          <UpperCaseIcon />
                        </Radio.Button>
                        <Radio.Button value="aa">
                          <LowerCaseIcon />
                        </Radio.Button>
                      </Radio.Group>
                    }
                    visible={cases}
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
                    type="default"
                    icon={<StrikethroughOutlined />}
                    size="small"
                  />
                </Tooltip>
              </Col>
              <Col>
                <Tooltip placement="right" title="Language">
                  <Button
                    type="default"
                    icon={<TranslationOutlined />}
                    size="small"
                  />
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
