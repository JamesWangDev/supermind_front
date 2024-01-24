import { RiAppleLine } from 'react-icons/ri';
import { Col } from 'reactstrap';

const TopbarLeft = () => {
  return (
    <Col xxl={3} className='d-xxl-block d-none'>
      <div className='top-left-header'>
        <RiAppleLine className='text-white'/>
        <span className='text-white'>Get the App</span>
      </div>
    </Col>
  );
};

export default TopbarLeft;
