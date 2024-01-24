import { Col } from 'reactstrap';

const SellerSteps = ({ data, number }) => {
  return (
    <Col xl={4} sm={6}>
      <div className='business-box'>
        <div>
          <div className='business-number'>
            <h2>{number}</h2>
          </div>
          <div className='business-detail'>
            <h4>{data?.title}</h4>
            <p>{data?.description}</p>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default SellerSteps;
