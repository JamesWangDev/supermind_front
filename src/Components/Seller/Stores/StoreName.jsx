import { useContext } from 'react';
import Link from 'next/link';
import { Label } from 'reactstrap';
import { RiArrowRightLine } from 'react-icons/ri';
import I18NextContext from '@/Helper/I18NextContext';
import ProductBox1Rating from '@/Components/Common/ProductBox/ProductBox1/ProductBox1Rating';
import StoreImage from './StoreImage';
import { useTranslation } from '@/app/i18n/client';

const StoreName = ({ elem, classicImage }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <div className='contain-name'>
      <div>
        <Link href={`/${i18Lang}/seller/stores/${elem?.slug}`}>
          <h3>{elem?.store_name}</h3>
        </Link>
        <div className='since-number'>
          <div className='product-rating'>
            <ProductBox1Rating totalRating={elem?.rating_count} />
            <h6>{`(${elem?.reviews_count} Review)`}</h6>
          </div>
        </div>
        {classicImage && (
          <Link href={`/${i18Lang}/seller/stores/${elem?.slug}`} className='btn btn-sm theme-bg-color text-white fw-bold d-inline-flex'>
            {t('VisitStore')}
            <RiArrowRightLine className='ms-2' />
          </Link>
        )}
      </div>
      {!classicImage && (
        <Label className='product-label'>
          {elem?.products_count} {t('Products')}
        </Label>
      )}
      {classicImage && <StoreImage customClass={'grid-image'} elem={elem} />}
    </div>
  );
};

export default StoreName;
