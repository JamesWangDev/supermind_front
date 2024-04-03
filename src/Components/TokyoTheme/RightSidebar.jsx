import OfferBanner from '@/Components/ParisTheme/OfferBanner';

const RightSidebar = ({ dataAPI }) => {
  return (
    <div className='position-sticky top-0'>
      <OfferBanner
        classes={{ customClass: 'ratio_209 rounded', customHoverClass: 'banner-contain rounded hover-effect' }}
        imgUrl={dataAPI?.banner_1?.image_url}
        ratioImage={true}
        elem={dataAPI?.banner_1}
      />

      <OfferBanner
        classes={{ customClass: 'ratio_125 section-t-space', customHoverClass: 'banner-contain rounded hover-effect' }}
        imgUrl={dataAPI?.banner_2?.image_url}
        ratioImage={true}
        elem={dataAPI?.banner_2}
      />
    </div>
  );
};

export default RightSidebar;
