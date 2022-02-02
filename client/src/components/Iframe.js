import React from 'react';
import axios from 'axios';
import Frame from 'react-iframe';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";

import { counter } from "../reducers/counter";
import { template } from "../reducers/template";
import { dynamicElements } from "../reducers/dynamicElements";
import { sidePanel } from "../reducers/sidePanel";
import { objectDynamic } from "../reducers/objectDynamic";
import { playPause } from '../reducers/playPause';
import { creativeTime } from '../reducers/creativeTime';
import { creativeStarted } from "../reducers/creativeStarted";

import FrameControl from './FrameControl';

const Iframe = () => {
    const dispatch = useDispatch();
    const { templateId } = useParams();

    const temp = useSelector((state) => state.template.value);
    const count = useSelector((state) => state.counter.value);
    const dynamic = useSelector((state) => state.dynamicElements.value);
    const objects = useSelector((state) => state.objectDynamic.value);
    const cStarted = useSelector((state) => state.creativeStarted.value);

    const [visibleFrame, setVisibleFrame] = React.useState(true);

    React.useEffect(() => {
      Object.keys(temp).length > 0
        ? setVisibleFrame(true)
        : setVisibleFrame(false);
    }, [temp, dispatch]);

    const loaded = (e) => {
        window.addEventListener("message", (event) => getDynamic(event));
        dispatch(creativeTime(0));
        //check if data exist
        
            if (
              Object.keys(dynamic).length > 0 &&
              Object.keys(temp).includes("defaultValues") === false
            ) {
              setTimeout(() => {
                axios
                  .put("/PlaygroundAPI/update", {
                    _id: templateId,
                    data: {
                      defaultValues: dynamic.defaultValues,
                      possibleValues: dynamic.possibleValues,
                    },
                  })
                  .then((res) => {
                    dispatch(template(res.data));
                    dispatch(objectDynamic(res.data.defaultValues));
                    dispatch(counter(count + 1));
                  });
              }, 1000);
            } else {
              if (objects !== undefined) {
                if (Object.keys(objects).length > 0) {
                  setTimeout(() => {
                    
                    dispatch(sidePanel(false));
                    setVisibleFrame(false);
                    dispatch(playPause({ paused: false, visible: true}));

                    document
                      .querySelector(".playground-iframe")
                      .contentWindow.postMessage(
                        objects,
                        `https://storage.googleapis.com/${temp.url}/${
                          temp.uid
                        }/${decodeURIComponent(temp.directory)}/index.html`
                      );
                    
                    document
                      .querySelector(".playground-iframe")
                      .contentWindow.postMessage("time",
                        `https://storage.googleapis.com/${temp.url}/${
                          temp.uid
                        }/${decodeURIComponent(temp.directory)}/index.html`
                      );
                  }, 500);
                }
              }
            }
    }
    
    const getDynamic = (e) => {
      e.preventDefault();
      if (
        e.data.type === "DEFAULT_VALUES" &&
        Object.keys(dynamic).length <= 0
      ) {
        dispatch(dynamicElements(e.data));
        dispatch(counter(count + 1));
      }else if (e.data.type === "SCREENSHOT_STOP") {
        setTimeout(() => {
          dispatch(playPause({ paused: true, visible: false }));
        }, 1000);
      } else if (e.data.type === "SCREENSHOT_START" &&
        Object.keys(dynamic).length > 0) {
        dispatch(creativeStarted(true));
      } else if (e.data.type === "CREATIVE_TIME" && Object.keys(dynamic).length > 0) {
        dispatch(creativeTime(e.data.t));
      }
    }

    return (
      <React.Fragment>
        {Object.keys(temp).length > 0 ? (
          <div className="Iframe">
            <Spin
              spinning={!cStarted}
              delay={500}
              style={{ maxHeight: "100%" }}
            >
              <Frame
                key={count}
                url={`https://storage.googleapis.com/${temp.url}/${
                  temp.uid
                }/${decodeURIComponent(temp.directory)}/index.html`}
                width={`${temp.width}px`}
                height={`${temp.height}px`}
                id="playground-iframe"
                className="playground-iframe"
                display="initial"
                position="relative"
                onLoad={(e) => loaded(e)}
              />
            </Spin>
            <FrameControl />
          </div>
        ) : null}
      </React.Fragment>
    );
}

export default Iframe;