import React, { useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import ProductContent from './ProductContent';
import WrapperComponent from '../../Common/WrapperComponent';
import NoDataFound from '@/Components/Common/NoDataFound';

const TopSelling = ({ dataAPI, classes, customRow }) => {
  const filterTopProducts = useMemo(() => {
    return Object.values(dataAPI).filter((el) => (el?.title && el.status && el.product_ids.length >= 3 ? true : false));
  }, [dataAPI]);

  return (
    <>
      {customRow ? (
        filterTopProducts?.length > 0 ? (
          <Row className='g-sm-4 g-3'>
            {filterTopProducts?.map((elem, i) => (
              <Col xl={3} key={i} {...classes?.colClass}>
                <div className={`top-selling-box ${classes?.boxClass ?? ''}`}>
                  <div className='top-selling-title'>
                    <h3>{elem?.title}</h3>
                  </div>
                  <ProductContent elem={elem} />
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <NoDataFound
            data={{
              customClass: 'bg-second border-10 no-data-added',
              title: 'No Product Found',
            }}
          />
        )
      ) : (
        <WrapperComponent classes={{ sectionClass: 'top-selling-section', fluidClass: classes?.fluidClass }} noRowCol={true}>
          <div className={`slider-4-1 ${classes?.customClass ? classes?.customClass : ''}`}>
            <Row className='g-sm-4 g-3'>
              {filterTopProducts.map((elem, i) => (
                <Col xl={3} key={i} {...classes?.colClass}>
                  <div className={`top-selling-box ${classes?.boxClass ?? ''}`}>
                    <div className='top-selling-title'>
                      <h3>{elem?.title}</h3>
                    </div>
                    <ProductContent elem={elem} />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </WrapperComponent>
      )}
    </>
  );
};

export default TopSelling;
