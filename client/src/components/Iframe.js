import Frame from 'react-iframe';

const Iframe = () => {
    return (
      <div className="Iframe">
        <Frame
          key={1}
          url={`https://storage.googleapis.com/adlib-showcase-bucket/dca6d0b0-325d-11ec-8ac8-eb2c74bb0290/300x600-AAP/index.html`}
          width={`${300}px`}
          height={`${600}px`}
          id="innov-iframe"
          className="innov-iframe"
          display="initial"
          position="relative"
          //   onLoad={(e) => loaded(e)}
        />
      </div>
    );
}

export default Iframe;