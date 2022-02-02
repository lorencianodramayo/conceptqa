import React from "react";
import { Row, Col, Typography, Button, Divider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Icon, {
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

//reducers
import { counter } from "../reducers/counter";
import { playPause } from "../reducers/playPause";
import { creativeTime } from "../reducers/creativeTime";

import { CreativeSvg, DurationSvg } from "../assets/icons";

const CreativeIcon = (props) => <Icon component={CreativeSvg} {...props} />;
const DurationIcon = (props) => <Icon component={DurationSvg} {...props} />;

const { Text } = Typography;

const FrameControl = () => {
  const dispatch = useDispatch();

  const count = useSelector((state) => state.counter.value);
  const temp = useSelector((state) => state.template.value);
  const pPause = useSelector((state) => state.playPause.value);
  const cTime = useSelector((state) => state.creativeTime.value)

  const PlayPauseCreative = () => {
    dispatch(playPause({ paused: !pPause.paused, visible: pPause.visible }));
    document
      .querySelector(".playground-iframe")
      .contentWindow.postMessage(
        !pPause.paused ? "pause" : "play",
        `https://storage.googleapis.com/${temp.url}/${
          temp.uid
        }/${decodeURIComponent(temp.directory)}/index.html`
      );
  };

  const RefreshCreative = () => {
      dispatch(counter(count + 1));
      dispatch(playPause({ paused: true, visible: false }));
      dispatch(creativeTime(0.0));
  };

  return (
    <React.Fragment>
      {temp.width !== undefined ? (
        <div className="FrameControl" style={{width: `${temp.width}px`}}>
          <Row>
            <Col span={16}>
              <Row gutter={[8, 0]}>
                <Col>
                  <CreativeIcon style={{ color: "#f22176" }} />
                  <Text style={{ color: "#f22176", fontSize: "10px" }}>
                    {" "}
                    {`${temp.width}x${temp.height}`}{" "}
                  </Text>
                </Col>
                <Col>
                  <DurationIcon style={{ color: "#f22176" }} />
                  <Text style={{ color: "#f22176", fontSize: "10px" }}>
                    {"  "}
                    {cTime}
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col
              span={8}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Row>
                <Col>
                  <Button
                    type="text"
                    size="small"
                    style={
                      pPause.visible
                        ? { color: "#f22176", display: "inline-block" }
                        : { display: "none" }
                    }
                    icon={
                      pPause.paused ? (
                        <PlayCircleOutlined />
                      ) : (
                        <PauseCircleOutlined />
                      )
                    }
                    onClick={PlayPauseCreative}
                  />
                </Col>
                <Col>
                  <Button
                    type="text"
                    size="small"
                    style={{ color: "#f22176" }}
                    icon={<ReloadOutlined />}
                    onClick={RefreshCreative}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default FrameControl;
