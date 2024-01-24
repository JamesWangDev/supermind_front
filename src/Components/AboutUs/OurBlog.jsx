import { useContext } from 'react';
import { Row } from 'reactstrap';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { latestBlogSlider } from '../../../Data/SliderSettingsData';
import WrapperComponent from '../Common/WrapperComponent';
import FeatureBlog from '../ParisTheme/FeatureBlog';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import NoDataFound from '../Common/NoDataFound';

const OurBlog = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <WrapperComponent classes={{ sectionClass: 'section-lg-space' }} noRowCol>
      <div className='about-us-title text-center'>
        <h4 className='text-content'>{t('OurBlog')}</h4>
        <h2 className='center'>{t('OurLatestBlog')}</h2>
      </div>
      {themeOption?.about_us?.blog?.length > 0 ? (
        <Row>
          <FeatureBlog dataAPI={themeOption?.about_us?.blog} classes={{ sliderClass: 'col-12', sliderOption: latestBlogSlider }} />
        </Row>
      ) : (
        <NoDataFound
          data={{
            customClass: 'bg-light no-data-added',
            title: 'No Blog Found',
          }}
        />
      )}
    </WrapperComponent>
  );
};

export default OurBlog;
