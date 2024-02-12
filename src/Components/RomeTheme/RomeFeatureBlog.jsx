import WrapperComponent from '../Common/WrapperComponent';
import CustomHeading from '../Common/CustomHeading';
import FeatureBlog from '../ParisTheme/FeatureBlog';
import { romeBlogSliderOption } from '../../../Data/SliderSettingsData';
import NoDataFound from '../Common/NoDataFound';

const RomeFeatureBlog = ({ dataAPI }) => {
  return (
    <WrapperComponent classes={{ sectionClass: '' }}>
      <CustomHeading title={dataAPI?.featured_blogs?.title} />
      {dataAPI?.featured_blogs?.blog_ids?.length > 0 ? (
        <FeatureBlog dataAPI={dataAPI?.featured_blogs} classes={{ sliderClass: 'slider-3 arrow-slider', sliderOption: romeBlogSliderOption, ratioClass: 'ratio_65' }} />
      ) : (
        <NoDataFound data={{ customClass: 'bg-second border-10 no-data-added', title: 'No Blog Found' }} />
      )}
    </WrapperComponent>
  );
};

export default RomeFeatureBlog;
