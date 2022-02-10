import React from "react";
import axios from "axios";
import { useCookieState } from "ahooks";
import { Upload, notification } from "antd";

import { useNavigate } from "react-router-dom";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const FileDrag = (props) => {
  const [cId, setCid] = useCookieState("playgroundId");
  const [playground, setPlayground] = React.useState('');
  const [uploaded, setUploaded] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(()=> {
    axios.post("/TemplateAPI/", { templates: [] }).then((res) => {
      setPlayground(res.data._id);
      setCid("");
    });
  }, [setCid])

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
      const { status, response } = info.file;

      if (status === "done") {
        setUploaded(uploaded+1);
          axios
            .put("/TemplateAPI/update", {
              _id: playground,
              data: {
                templateId: response._id,
                name: response.directory.split("-")[1],
                dimension: `${response.width}x${response.height}`,
              },
            })
            .then((res) => {
              if (count === uploaded) {
                notification.success({
                  message: `${
                    count > 1 ? `Templates` : `Template`
                  } Successfully Uploaded!`,
                  description: `${count} ${
                    count > 1 ? `creatives are` : `creative is`
                  } now uploaded, please wait for the playground to load.`,
                  placement: "bottomLeft",
                });
                navigate(`/playground/${playground}`);
              }
            });
      }
    },
  };
  return (
    <div style={{ padding: "24px" }}>
      <Dragger
        {...prop}
        style={count > 0 ? { display: "none" } : { display: "block" }}
      >
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
