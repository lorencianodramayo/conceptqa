import React from "react";
import { useSelector } from "react-redux";
import { Card, Form, Image, Modal, Switch } from "antd";
import { FileImageOutlined } from "@ant-design/icons";

//global
import TextInput from "../global/TextInput";
import Selection from "../global/Selection";
import ImageSelection from "../global/ImageSelection";

const Sidebar = () => {
  const [form] = Form.useForm();

  const temp = useSelector((state) => state.template.value);

  const [modal2Visible, setModal2Visible] = React.useState(false);
  const [showImages, setShowImages] = React.useState(false);

  const onSwitchChange = () => {
    setShowImages(!showImages);
  };

  return (
    <React.Fragment>
      {Object.keys(temp).includes("defaultValues") ? (
        <div className="Sidebar">
          <Card
            title={`${Object.keys(temp.defaultValues).length} Dynamic Elements`}
            extra={
              <Switch
                size="small"
                checkedChildren={<FileImageOutlined />}
                unCheckedChildren={<FileImageOutlined />}
                onChange={onSwitchChange}
              />
            }
          >
            <Form form={form} layout="vertical">
              {Object.keys(temp.defaultValues).map((dv, index) => {
                if (
                  [
                    "image",
                    "logo",
                    "img",
                    "background",
                    "roundel",
                    "video",
                    "audio",
                    "packshot",
                  ].some((t) => dv.toLowerCase().includes(t))
                ) {
                  return (
                    <ImageSelection label={dv} url={temp.defaultValues[dv]} />
                  );
                } else {
                  return temp.possibleValues !== undefined ? (
                    typeof temp.possibleValues[dv] !== "undefined" ||
                    temp.possibleValues[dv] !== undefined ? (
                      <Selection
                        label={dv}
                        options={temp.possibleValues[dv]}
                        value={temp.defaultValues[dv]}
                      />
                    ) : (
                      <TextInput label={dv} content={temp.defaultValues[dv]} />
                    )
                  ) : (
                    <TextInput label={dv} content={temp.defaultValues[dv]} />
                  );
                
              }})}
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
            maskStyle={{ backgroundColor: "#5c18ff78" }}
          >
            <Image
              width={200}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </Modal>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Sidebar;
