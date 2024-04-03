import { useContext } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { Input } from 'reactstrap';
import WrapperComponent from '../Common/WrapperComponent';
import CustomHeading from '../Common/CustomHeading';
import { bankOfferSliderOption } from '../../../Data/SliderSettingsData';
import Btn from '@/Elements/Buttons/Btn';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const BankOfferBanner = ({ dataAPI }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const CopyCode = (value) => {
    navigator.clipboard.writeText(value);
  };
  return (
    <WrapperComponent classes={{ sectionClass: 'bank-section overflow-hidden' }} noRowCol={true}>
      <CustomHeading title={dataAPI?.title} customClass={'section-t-space'} customTitleClass={'title'} />
      <div className='slider-bank-3 arrow-slider slick-height bank-box'>
        <Slider {...bankOfferSliderOption}>
          {dataAPI?.offers?.map((offer, i) => (
            <div key={i}>
              <div className='bank-offer'>
                <div className='bank-left'>
                  <img src={offer?.image_url} className='img-fluid w-100' alt='bank-image' height={225} width={515} />
                </div>

                <div className='bank-footer bank-footer-1'>
                  <h4>
                    {t('Code')} :
                    <Input defaultValue={offer?.coupon_code} />
                  </h4>
                  <Btn type='button' className='bank-coupon' onClick={() => CopyCode(offer.coupon_code)}>
                    {t('CopyCode')}
                  </Btn>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </WrapperComponent>
  );
};

export default BankOfferBanner;
