import React from "react";
import { message } from "antd";

import { useNavigate } from "react-router-dom";

import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const FileDrag = (props) => {
  let navigate = useNavigate();
  const prop = {
    accept: ".zip",
    name: "upload",
    type: "post",
    multiple: true,
    action: "/api/upload",
    contentType: false,
    processData: false,
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        navigate(info.file.response._id);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div style={{ padding: "24px" }}>
      <Dragger {...prop}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">Supports multiple .zip file upload.</p>
      </Dragger>
    </div>
  );
};

export default FileDrag;
