import Image from 'next/image';
import { Col } from 'reactstrap';

const SellerServiceBox = ({ data }) => {
  return (
    <Col xxl={3} lg={4} sm={6}>
      <div className='service-box'>
        <div className='service-svg'>{data?.image_url && <img src={data?.image_url} height={60} width={60} alt={data?.title || 'Seller'} />}</div>
        <div className='service-detail'>
          <h4>{data?.title}</h4>
          <p>{data?.description}</p>
        </div>
      </div>
    </Col>
  );
};

export default SellerServiceBox;
