import { Col } from 'reactstrap';

const SkeletonWrapper = ({ classes, ...props }) => {
  return (
    <Col {...classes?.colProps} className={`${classes?.colClass ?? ''}`}>
      <div className={`${classes?.divClass ?? ''}`}>
        <div className='skeleton-text-wrap'>
          <span className='placeholder col-7'></span>
          <span className='placeholder col-5'></span>
          <span className='placeholder col-4'></span>
          <span className='placeholder col-6'></span>
        </div>
        {props?.children}
      </div>
    </Col>
  );
};

export default SkeletonWrapper;
