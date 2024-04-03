import { useContext } from 'react';
import { Col } from 'reactstrap';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import Image from 'next/image';

const SellerPoster = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <WrapperComponent classes={{ sectionClass: 'seller-poster-section' }} customCol={true}>
      <Col xs={12}>
        <div className='poster-box'>
          <div className='poster-image'>
            {themeOption?.seller?.about?.image_url && <img src={themeOption?.seller?.about?.image_url} height={438} width={512} alt={themeOption?.seller?.about?.title || 'Seller'} className='w-100'/>}
          </div>
        </div>
      </Col>

      <Col xs={12}>
        <div className='seller-title h-100 d-flex align-items-center'>
          <div>
            <h2>{themeOption?.seller?.about?.title.toLowerCase()}</h2>
            <p>{themeOption?.seller?.about?.description}</p>
          </div>
        </div>
      </Col>
    </WrapperComponent>
  );
};

export default SellerPoster;
