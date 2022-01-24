import React from "react";
import { Select, Divider, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

let index = 0;

const Tselect = () => {
    const [items, setItems] = React.useState([]);
    const [name, setName] = React.useState('');

    const onNameChange = (e) =>{
        setName(e.target.value);
    }

    const addItem = () => {
        setItems((prevState) => [name || `New item ${index++}`, ...prevState]);
        setName('');
    }

    return (
      <Select
        style={{ width: 240 }}
        placeholder="Select Tearsheet"
        dropdownRender={(menu) => (
          <div>
            {menu}
            <Divider style={{ margin: "4px 0" }} />
            <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
              <Input
                style={{ flex: "auto" }}
                value={name}
                onChange={onNameChange}
              />
              <a
                style={{
                  flex: "none",
                  padding: "8px",
                  display: "block",
                  cursor: "pointer",
                }}
                onClick={addItem}
              >
                <PlusOutlined /> Add item
              </a>
            </div>
          </div>
        )}
      >
        {items.map((item) => (
          <Option key={item}>{item}</Option>
        ))}
      </Select>
    );
}

export default Tselect;