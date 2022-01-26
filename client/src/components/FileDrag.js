import React from "react";
import { Upload, notification } from "antd";

import { useNavigate } from "react-router-dom";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const FileDrag = (props) => {
  const [uploaded, setUploaded] = React.useState(1);
  const [count, setCount] = React.useState(0);

  let navigate = useNavigate();
  const prop = {
    accept: ".zip",
    name: "upload",
    type: "post",
    multiple: true,
    action: "/TemplateAPI/upload",
    contentType: false,
    processData: false,
    showUploadList: {
      showDownloadIcon: false,
      showRemoveIcon: false,
    },
    beforeUpload(file, fileList) {
      setCount(fileList.length);
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        setUploaded(uploaded+1);

        console.log(count, uploaded);
        if (count === uploaded) {
          notification.success({
            message: `${
              count > 1 ? `Templates` : `Template`
            } Successfully Uploaded!`,
            description: `${count} ${
              count > 1 ? `creatives are` : `creative is`
            } now uploaded, please wait for the playground to load.`,
            placement: "topRight",
          });
          //navigate("/playground/12");
        }
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
