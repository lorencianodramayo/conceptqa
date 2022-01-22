import React from "react";
import { Card, Form, Input, Select, Button, Image, Modal, Switch } from "antd";
import { HighlightOutlined } from "@ant-design/icons";

const { Option } = Select;

const Sidebar = () => {
  const [form] = Form.useForm();
  const [modal2Visible, setModal2Visible] = React.useState(false);
  const [showImages, setShowImages] = React.useState(false);

  const onSwitchChange = () =>{
    setShowImages(!showImages);
  }

  return (
    <div className="Sidebar">
      <Card
        title="Dynamic Elements"
        extra={<Switch size="small" onChange={onSwitchChange} />}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="note"
            label="frame1Headline"
            rules={[{ required: true }]}
          >
            <Input placeholder="Lorem Ipsum" />
          </Form.Item>
          <Form.Item
            name="select"
            label="customVariable"
            rules={[{ required: true, message: "Please select your country!" }]}
          >
            <Select placeholder="Please select a country">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="image"
            label="frame1Image"
            rules={[{ required: true }]}
            style={!showImages? {display: 'none'}:{display: 'flex'}}
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
      >
        <Image
          width={200}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </Modal>
    </div>
  );
};

export default Sidebar;
