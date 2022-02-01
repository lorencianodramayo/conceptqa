import { Row, Col, Typography, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Icon, {
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

//reducers
import { counter } from "../reducers/counter";
import { playPause } from "../reducers/playPause";

import { CreativeSvg } from "../assets/icons";

const CreativeIcon = (props) => <Icon component={CreativeSvg} {...props} />;

const { Text } = Typography;

const FrameControl = () => {
  const dispatch = useDispatch();

  const count = useSelector((state) => state.counter.value);
  const temp = useSelector((state) => state.template.value);
  const pPause = useSelector((state) => state.playPause.value);

  const PlayPauseCreative = () => {
    dispatch(playPause(!pPause));
    document
      .querySelector(".innov-iframe")
      .contentWindow.postMessage(
        !pPause ? "pause" : "play",
        `https://storage.googleapis.com/${temp.url}/${
          temp.uid
        }/${decodeURIComponent(temp.directory)}/index.html`
      );
  };

  const RefreshCreative = () => {
      dispatch(counter(count + 1));
      dispatch(playPause(true));
  };

  return (
    <div className="FrameControl">
      {temp.width !== undefined ? (
        <Row>
          <Col span={12}>
            <CreativeIcon style={{ color: "#f22176" }} />
            <Text style={{ color: "#f22176", fontSize: "11px" }}>
              {" "}
              {`${temp.width}x${temp.height}`}{" "}
            </Text>
          </Col>
          <Col
            span={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Row>
              <Col>
                <Button
                  type="text"
                  size="small"
                  style={{ color: "#f22176" }}
                  icon={pPause? <PlayCircleOutlined /> : <PauseCircleOutlined />}
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
      ) : null}
    </div>
  );
};

export default FrameControl;
