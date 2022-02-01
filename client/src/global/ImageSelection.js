import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Image, Modal, Card, Row, Col } from "antd";
import { HighlightOutlined } from "@ant-design/icons";

//reducers
import { counter } from "../reducers/counter";
import { objectDynamic } from "../reducers/objectDynamic";
import { playPause } from "../reducers/playPause";

const ImageSelection = (props) => {
    const dispatch = useDispatch();
    const temp = useSelector((state) => state.template.value);
    const image = useSelector((state) => state.imageView.value);
    const imgList = useSelector((state) => state.imageList.value);
    const count = useSelector((state) => state.counter.value);

    const [modal2Visible, setModal2Visible] = React.useState(false);
    const [timer, setTimer] = React.useState(null);

    const updateImg = (label, url) => {
      props.forms.setFieldsValue({
        [`${label}`]: url,
      });

      clearTimeout(timer);

      const newTimer = setTimeout(() => {
        dispatch(objectDynamic(props.forms.getFieldsValue()));
        dispatch(counter(count + 1));
        dispatch(playPause({ paused: true, visible: false }));
        setTimer(newTimer);
        setModal2Visible(!modal2Visible);
      }, 2000);
    }

    return (
      <React.Fragment>
        <Form.Item
          required
          name={props.label}
          label={props.label}
          style={!image ? { display: "none" } : { display: "flex" }}
        >
          <Button
            type="dashed"
            className="btnImage"
            onClick={() => setModal2Visible(true)}
          >
            <div
              style={{
                padding: "0.2em",
                display: "flex",
                alignItems: "center",
                height: "-webkit-fill-available",
                width: "-webkit-fill-available",
              }}
            >
              <Image
                preview={{ visible: false, mask: <HighlightOutlined /> }}
                src={
                  props.url.includes("http")
                    ? props.url
                    : `https://storage.googleapis.com/${temp.url}/${temp.uid}/${temp.directory}/${props.url}`
                }
              />
            </div>
          </Button>
        </Form.Item>
        <Modal
          title={props.label}
          width={1000}
          centered
          closable={false}
          maskClosable={true}
          visible={modal2Visible}
          footer={null}
          onCancel={() => setModal2Visible(false)}
          bodyStyle={{ height: "80vh", overflow: "scroll" }}
        >
          <Row gutter={[16, 16]}>
            {imgList.length > 0
              ? imgList.map((data, i) => {
                  return data.assets.map((images, index) => {
                    return (
                      <Col span={6} key={index}>
                        <Card
                          bodyStyle={{ padding: "0.3em", height: "200px" }}
                          onClick={() =>
                            updateImg(
                              props.label,
                              `https://storage.googleapis.com/${data.url}/${data.uid}/${data.directory}/${images}`
                            )
                          }
                        >
                          <div
                            style={{
                              padding: "0.2em",
                              display: "flex",
                              alignItems: "center",
                              height: "-webkit-fill-available",
                              width: "-webkit-fill-available",
                            }}
                          >
                            <Image
                              src={`https://storage.googleapis.com/${data.url}/${data.uid}/${data.directory}/${images}`}
                              preview={{
                                visible: false,
                                mask: images,
                              }}
                            />
                          </div>
                        </Card>
                      </Col>
                    );
                  });
                })
              : null}
          </Row>
        </Modal>
      </React.Fragment>
    );
}

export default ImageSelection;