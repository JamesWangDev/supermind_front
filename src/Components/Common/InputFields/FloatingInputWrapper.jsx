import { Col, FormGroup } from 'reactstrap';

const FloatingInputWrapper = (props) => {
  return (
    <Col xs={12}>
      <FormGroup floating className='theme-form-floating'>
        {props.children}
      </FormGroup>
    </Col>
  );
};

export default FloatingInputWrapper;
