import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import CustomHeading from '@/Components/Common/CustomHeading';
import { specialOfferSliderOffer } from '../../../../Data/SliderSettingsData';
import ProductBox1Rating from '@/Components/Common/ProductBox/ProductBox1/ProductBox1Rating';
import { placeHolderImage } from '../../../../Data/CommonPath';
import Timer from './Timer';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import SettingContext from '@/Helper/SettingContext';
import Avatar from '@/Components/Common/Avatar';
import { Progress } from 'reactstrap';
import ProductBoxAction from '@/Components/Common/ProductBox/ProductBox1/ProductBox1Action';

const SpecialOffer = ({ dataAPI, ProductData }) => {
  const [dealProduct, setDealProduct] = useState([]);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { convertCurrency } = useContext(SettingContext);
  useEffect(() => {
    // Get today's date
    const today = new Date();
    let temp = dataAPI?.deal_of_days?.deals?.map((deal) => {
      const givenDateStr = deal?.end_date;
      const givenDate = new Date(givenDateStr);
      return ((deal.product = ProductData?.find((product) => product.id === deal.product_id)), givenDate < today ? (deal.expired = true) : (deal.expired = false)), deal;
    });
    setDealProduct(temp);
  }, [dataAPI, ProductData]);
  return (
    <div className='product-bg-image'>
      <CustomHeading title={dataAPI?.deal_of_days?.title} customTitleClass='product-title product-warning' />

      <div className='product-box-4 product-box-3 rounded-0'>
        <div className='top-selling-slider product-arrow'>
          <Slider {...specialOfferSliderOffer}>
            {dealProduct
              .filter((el) => !el.expired)
              ?.map((elem, i) => (
                <div key={i}>
                  <div className='product-image'>
                    <Link href={`/${i18Lang}/product/${elem?.product?.slug}`}>
                      <Avatar data={elem?.product?.product_thumbnail} placeHolder={placeHolderImage} name={elem?.product?.name || 'product'} height={339} width={264} customImageClass={'img-fluid product-image'}/>
                    </Link>
                    {elem?.product && <ProductBoxAction productObj={elem?.product} listClass="option" key={i} />}
                  </div>

                  <div className='product-detail text-center'>
                    <ProductBox1Rating classes={{ customClass: 'justify-content-center' }} totalRating={elem?.product?.rating_count} />
                    <Link href={`/${i18Lang}/product/${elem?.product?.slug}`}>
                      <h3 className='name w-100 mx-auto text-center'>{elem?.product?.name}</h3>
                    </Link>
                    <h3 className='price theme-color d-flex justify-content-center'>
                      {elem?.product?.sale_price ? convertCurrency(elem?.product?.sale_price) : null}
                      <del className='delete-price'>{elem?.product?.price ? convertCurrency(elem?.product?.price) : null}</del>
                    </h3>
                    <Progress className='custom-progressbar' value={(elem?.product?.quantity * 100) / 10} />
                    <h5 className='text-content'>
                      {t('Solid')} :
                      <span className='text-dark'>
                        {elem?.product?.quantity} {t('items')}
                      </span>
                      <span className='ms-auto text-content'>{t('Hurryupofferendin')}</span>
                    </h5>
                    <Timer elem={elem} dealProduct={dealProduct} setDealProduct={setDealProduct} />
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
