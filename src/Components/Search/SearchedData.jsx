import WrapperComponent from '../Common/WrapperComponent';
import { Col, Row } from 'reactstrap';
import ProductBox1 from '../Common/ProductBox/ProductBox1/ProductBox1';
import NoDataFound from '../Common/NoDataFound';
import emptyImage from '../../../..../..//public/assets/svg/empty-items.svg';

const SearchedData = ({ data }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'section-b-space' }} noRowCol={true}>
      {data?.length > 0 ? (
      <Row xs={2} md={3} xxl={6} className='cols-lg-4 g-3 g-sm-4 product-list-section'>
          {data?.map((elem, i) => (
            <Col key={i}>
              <div className='search-product product-wrapper'>
                <div>
                  <ProductBox1 imgUrl={elem?.product_thumbnail} productDetail={{ ...elem }} />
                </div>
              </div>
            </Col>
          ))}
      </Row>
      ) : (
        <NoDataFound data={{ customClass: 'no-data-added', imageUrl: emptyImage, title: "productsNoFound", description: 'productsNoFoundDescription', height: 300, width: 300,}}/>
      )}
    </WrapperComponent>
  );
};

export default SearchedData;
