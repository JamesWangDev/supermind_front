import I18NextContext from '@/Helper/I18NextContext';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { useTranslation } from '@/app/i18n/client';
import Image from 'next/image';
import { useContext } from 'react';
import { Col } from 'reactstrap';

const AboutUsText = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { themeOption } = useContext(ThemeOptionContext);

  return (
    <Col xl='6' xs='12'>
      <div className='fresh-contain p-center-left'>
        <div>
          <div className='review-title'>
            <h4>{themeOption?.about_us?.about?.sub_title}</h4>
            <h2>{themeOption?.about_us?.about?.title}</h2>
          </div>
          <div className='delivery-list'>
            <p className='text-title'>{themeOption?.about_us?.about?.description}</p>
            <ul className='delivery-box'>
              {themeOption?.about_us?.about?.futures.map((data, index) => (
                <li key={index}>
                  <div className='delivery-box'>
                    <div className='delivery-icon'>
                      <Image src={data?.icon} alt='delivery' height={26.13} width={30} />
                    </div>
                    <div className='delivery-detail'>
                      <h5 className='text'>{t(data?.title)}</h5>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default AboutUsText;
