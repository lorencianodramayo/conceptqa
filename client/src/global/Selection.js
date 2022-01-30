import React from "react";
import { Form, Select } from "antd";

const { Option } = Select;

const Selection = (props) => {
  return (
    <React.Fragment>
      <Form.Item name={props.label} label={props.label} required>
        <Select>
          {props.options.split(",").map((pval, pindex) => {
            return (
              <Option
                value={
                  pval.split("")[0] === " "
                    ? pval.split("").slice(1).join("")
                    : pval
                }
                key={pindex}
              >
                {pval.split("")[0] === " "
                  ? pval.split("").slice(1).join("")
                  : pval}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    </React.Fragment>
  );
};

export default Selection;
