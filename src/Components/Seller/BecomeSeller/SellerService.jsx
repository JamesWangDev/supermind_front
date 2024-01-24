import { useContext } from 'react';
import { Row } from 'reactstrap';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import SellerServiceBox from './SellerServiceBox';

const SellerService = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <WrapperComponent classes={{ sectionClass: 'become-service section-b-space' }} noRowCol={true}>
      <div className='seller-title mb-5'>
        <h2>{themeOption?.seller?.services?.title}</h2>
      </div>
      <Row className='g-md-4 g-3'>
        <SellerServiceBox data={themeOption?.seller?.services?.service_1} />
        <SellerServiceBox data={themeOption?.seller?.services?.service_2} />
        <SellerServiceBox data={themeOption?.seller?.services?.service_3} />
        <SellerServiceBox data={themeOption?.seller?.services?.service_4} />
      </Row>
    </WrapperComponent>
  );
};

export default SellerService;
