import { Col } from 'reactstrap';
import SKProductHorizontal from './SKProductHorizontal';

const ProductSkeletonComponent = ({ item }) => {
  const skeletonItems = Array.from({ length: item }, (_, index) => index);
  return (
    <>
      {skeletonItems?.map((elem, i) => (
        <Col key={i}>
          <SKProductHorizontal />
        </Col>
      ))}
    </>
  );
};

export default ProductSkeletonComponent;
