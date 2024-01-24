import { useState } from 'react';
import { Col, Row, TabContent, TabPane } from 'reactstrap';
import NavTabTitles from '@/Components/Common/NavTabs';
import TextLimit from '@/Utils/CustomFunctions/TextLimit';
import CustomerReview from './CustomerReview';
import QnATab from './QnATab';
import NoDataFound from '@/Components/Common/NoDataFound';

const ProductDetailsTab = ({ productState }) => {
  const [activeTab, setActiveTab] = useState(1);
  const ProductDetailsTabTitle = [
    { id: 1, name: 'Description' },
    { id: 2, name: 'Review' },
    { id: 3, name: 'QA' },
  ];
  return (
    <Col xs={12}>
      <div className='product-section-box mt-0'>
        <NavTabTitles classes={{ navClass: 'nav-tabs custom-nav' }} titleList={ProductDetailsTabTitle} activeTab={activeTab} setActiveTab={setActiveTab} />

        <TabContent className='custom-tab' activeTab={activeTab}>
          <TabPane className={activeTab == 1 ? 'show active' : ''}>
            <TextLimit value={productState?.product?.description} />
          </TabPane>

          <TabPane className={activeTab == 2 ? 'show active' : ''}>
            <div className='review-box'>
              <Row className='g-4'>
                {productState?.product?.can_review || productState?.product?.reviews_count ? (
                  <CustomerReview productState={productState} />
                ) : (
                  <Col xl={12}>
                    <NoDataFound
                      data={{
                        customClass: 'no-data-added',
                        title: 'NoReviewYet',
                        description: 'NoReviewYetDescription',
                      }}
                    />
                  </Col>
                )}
              </Row>
            </div>
          </TabPane>
          <TabPane className={activeTab == 3 ? 'show active' : ''}>
            <QnATab productState={productState} activeTab={activeTab} />
          </TabPane>
        </TabContent>
      </div>
    </Col>
  );
};

export default ProductDetailsTab;
