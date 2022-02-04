import axios from 'axios';
import { Form, Input, Button, message } from "antd";

const AddLanguage = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        axios.post("/LanguageAPI/", values).then((res) => {
          message.success(`${values.name} is now added!`);
          form.setFieldsValue({ name: "", copies: "" });
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Copies" name="copies">
          <Input.TextArea rows={4} showCount={true} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
};

export default AddLanguage;