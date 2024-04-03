import { Col } from 'reactstrap';
import WrapperComponent from '../Common/WrapperComponent';

const OfferSkeleton = () => {
  const skeletonItems = Array.from({ length: 8 }, (_, index) => index);
  return (
    <WrapperComponent classes={{ sectionClass: 'section-b-space section-t-space offer-section skeleton-offer', row: 'g-md-4 g-3' }} customCol={true}>
      {skeletonItems?.map((elem, i) => (
        <Col xxl={3} lg={4} sm={6} key={i}>
          <div className='coupon-box'>
            <div className='coupon-name'>
              <div className='card-name'>
                <div>
                  <h5 className='fw-semibold dark-text '></h5>
                </div>
              </div>
            </div>
            <div className='coupon-content'>
              <p></p>
              <p className='long'></p>
              <p className='long long-s'></p>
            </div>
          </div>
        </Col>
      ))}
    </WrapperComponent>
  );
};

export default OfferSkeleton;
