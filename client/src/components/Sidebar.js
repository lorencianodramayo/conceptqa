import React from "react";
import { Card, Form, Input, Select, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const Sidebar = () => {
  const [form] = Form.useForm();

  return (
    <div className="Sidebar">
      <Card title="Dynamic Elements">
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
          >
            <Button
              type="dashed"
              onClick={() => console.log("hello")}
              style={{ width: "100%" }}
              icon={<PlusOutlined />}
            >
              Add Image
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Sidebar;
