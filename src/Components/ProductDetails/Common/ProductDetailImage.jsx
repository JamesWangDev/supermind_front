import Image from 'next/image';
import { Col } from 'reactstrap';

const ProductDetailImage = ({ imageProps = {} }) => {
  return (
    <Col xs={6} className='col-grid-box'>
      <div className='slider-image'>{imageProps?.imageUrl && <img src={imageProps?.imageUrl} className='img-fluid' alt='slider-image' height={imageProps?.height} width={imageProps?.width} />}</div>
    </Col>
  );
};

export default ProductDetailImage;
