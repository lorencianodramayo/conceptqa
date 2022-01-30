import React from 'react';
import { useSelector } from "react-redux";
import { Form, Button, Image} from "antd";
import { HighlightOutlined } from "@ant-design/icons";

const ImageSelection = (props) => {
    const temp = useSelector((state) => state.template.value);
    const image = useSelector((state) => state.imageView.value);

    return (
      <React.Fragment>
        <Form.Item
          required
          name={props.label}
          label={props.label}
          style={!image ? { display: "none" } : { display: "flex" }}
        >
          {/* <Button type="dashed" onClick={() => setModal2Visible(true)}> */}
          <Button type="dashed" className="btnImage">
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
      </React.Fragment>
    );
}

export default ImageSelection;