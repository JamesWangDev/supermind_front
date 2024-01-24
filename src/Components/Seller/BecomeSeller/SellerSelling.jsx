import { useContext } from 'react';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { Col, Form, Input, Row } from 'reactstrap';
import Btn from '@/Elements/Buttons/Btn';

const SellerSelling = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <WrapperComponent classes={{ sectionClass: 'selling-section section-b-space' }}>
      <div className='vendor-title'>
        <h5>{themeOption?.seller?.start_selling?.title}</h5>
        <p>{themeOption?.seller?.start_selling?.description}</p>
      </div>
      <Form className='mt-3'>
        <Row className='g-3'>
          <Col sm='6'>
            <Input type='email' placeholder='Email ID'></Input>
          </Col>
          <Col sm='6'>
            <Input type='number' placeholder='Phone Number'></Input>
          </Col>
        </Row>
        <Btn title="Start Selling" type="button" className='text-light theme-bg-color d-inline-block mt-3' />
      </Form>
    </WrapperComponent>
  );
};

export default SellerSelling;
