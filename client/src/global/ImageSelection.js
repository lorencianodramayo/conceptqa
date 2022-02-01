import React from 'react';
import { useSelector } from "react-redux";
import { Form, Button, Image, Modal, Card, Row, Col } from "antd";
import { HighlightOutlined } from "@ant-design/icons";

const ImageSelection = (props) => {
    const temp = useSelector((state) => state.template.value);
    const image = useSelector((state) => state.imageView.value);

    const [modal2Visible, setModal2Visible] = React.useState(false);

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
                src={`https://storage.googleapis.com/${temp.url}/${temp.uid}/${temp.directory}/${props.url}`}
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
          bodyStyle={{height: '80vh', overflow: 'scroll'}}
        >
          <Row gutter={[16, 16]}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((a, i) => {
              return (
                <Col span={6} key={i}>
                  <Card bodyStyle={{ padding: "0.3em", height: "200px" }}>
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
                        src="https://storage.googleapis.com/adlib-showcase-bucket/b6d7b7b0-8347-11ec-beab-858d76869a9e/300x600-Specsavers Global/300x600_frame1.jpg"
                        preview={{
                          visible: false,
                          mask: "hello",
                        }}
                      />
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Modal>
      </React.Fragment>
    );
}

export default ImageSelection;