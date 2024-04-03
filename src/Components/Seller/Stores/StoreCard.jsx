import { useContext } from 'react';
import Link from 'next/link';
import { Col } from 'reactstrap';
import StoreVendor from './StoreVendor';
import StoreProduct from './StoreProduct';
import StoreName from './StoreName';
import StoreImage from './StoreImage';
import { useTranslation } from '@/app/i18n/client';
import I18NextContext from '@/Helper/I18NextContext';
import { RiArrowRightLine } from 'react-icons/ri';
import SKStore from '@/Components/Common/SkeletonLoader/SellerSkeleton';
import Pagination from '@/Components/Common/Pagination';

const StoreCard = ({ data, isLoading, setPage }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const SkeletonItems = Array.from({ length: 15 }, (_, index) => index);
  return (
    <>
      {isLoading
        ? SkeletonItems?.map((elem, i) => (
          <Col xxl={4} md={6} key={i}>
            <SKStore />
          </Col>
        ))
        : data?.data.length > 0 && (
          <>
            {data?.data.map((elem, i) => (
              <Col xxl={4} md={6} key={i}>
                <div className="seller-grid-box seller-grid-box-1">
                  <div className="grid-image">
                    <Link href={`/${i18Lang}/seller/stores/${elem?.slug}`}>
                      <StoreImage customClass={"image"} elem={elem} />
                    </Link>
                    <StoreName elem={elem} />
                  </div>
                  <div className="grid-contain">
                    <StoreVendor elem={elem} />
                    <div className="seller-category">
                      <Link href={`/${i18Lang}/seller/stores/${elem?.slug}`} className="btn btn-sm theme-bg-color text-white fw-bold d-inline-flex">
                        {t("VisitStore")}
                        <RiArrowRightLine className="ms-2" />
                      </Link>
                      <StoreProduct elem={elem} />
                    </div>
                  </div>
                </div>
              </Col>
            ))}
            <nav className="custome-pagination">
              <Pagination current_page={data?.current_page} total={data?.total} per_page={data?.per_page} setPage={setPage} />
            </nav>
          </>
        )}
    </>
  );
};

export default StoreCard;
