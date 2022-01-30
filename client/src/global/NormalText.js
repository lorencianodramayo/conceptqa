import React from "react";
import {
  Form,
  Input,
} from "antd";

const NormalText = (props) => {
  return (
    <React.Fragment>
      <Form.Item
        required
        name={props.label}
        className="label"
        label={props.label}
      >
        <Input/>
      </Form.Item>
    </React.Fragment>
  );
};

export default NormalText;
