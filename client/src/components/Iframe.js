import React from 'react';
import axios from 'axios';
import Frame from 'react-iframe';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";

import { counter } from "../reducers/counter";
import { template } from '../reducers/template';

const Iframe = () => {
    const dispatch = useDispatch();
    const { templateId } = useParams();

    const temp = useSelector((state) => state.template.value);
    const count = useSelector((state) => state.counter.value);

    const [visibleFrame, setVisibleFrame] = React.useState(true);
    const [data, setData] = React.useState({});

    React.useEffect(() => {
      Object.keys(temp).length > 0
        ? setVisibleFrame(true)
        : setVisibleFrame(false);
    }, [temp, count]);

    const loaded = (e) => {
        window.addEventListener("message", (event) => {
            if (event.data.type === "DEFAULT_VALUES" && Object.keys(data).length <= 0) {
                setData(event.data);
                dispatch(counter(count + 1));
            }
        });

        //check if data exist
        if (Object.keys(data).length > 0 && Object.keys(temp).includes('defaultValues') === false) {
          axios
            .put("/PlaygroundAPI/update", {
              _id: templateId,
              data: {
                defaultValues: data.defaultValues,
                possibleValues: data.possibleValues,
              },
            })
            .then((res) => {
              dispatch(template(res.data));
              dispatch(counter(count + 1));
            });
        }else{
            setVisibleFrame(false);
        }
    }

    return (
      <React.Fragment>
        {Object.keys(temp).length > 0 ? (
          <div className="Iframe">
            <Spin spinning={visibleFrame} delay={500}>
              <Frame
                key={count}
                url={`https://storage.googleapis.com/${temp.url}/${temp.uid}/${temp.directory}/index.html`}
                width={`${temp.width}px`}
                height={`${temp.height}px`}
                id="innov-iframe"
                className="innov-iframe"
                display="initial"
                position="relative"
                onLoad={(e) => loaded(e)}
              />
            </Spin>
          </div>
        ) : null}
      </React.Fragment>
    );
}

export default Iframe;