import { Row, Col, Card, Typography } from "antd";
import FileDrag from './FileDrag';

const { Title, Text } = Typography;

const Home = () => {
  return (
    <div className="Home">
      <Row>
        <Col xs={24} sm={24} md={13} xl={10} xxl={13} className="slider-left">
          <Card title={<Title>Concept <Text>QA Tool</Text></Title>} bordered={false}>
            <Row>
              <Col span={24}><FileDrag/></Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
