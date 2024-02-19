import { useContext } from 'react';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import MainCollection from '../MainCollection';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import OfferBanner from '@/Components/ParisTheme/OfferBanner';

const CollectionNoSidebar = ({ filter, setFilter }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <>
      <WrapperComponent colProps={{ xs: 12 }}>
        {themeOption?.collection?.collection_banner_image_url && (
          <OfferBanner classes={{ customHoverClass: 'banner-contain hover-effect' }} imgUrl={themeOption?.collection?.collection_banner_image_url} />
        )}
      </WrapperComponent>
      <WrapperComponent classes={{ sectionClass: 'section-b-space section-t-space shop-section' }} customCol={true}>
        <MainCollection filter={filter} setFilter={setFilter} initialGrid={5} noSidebar={true} />
      </WrapperComponent>
    </>
  );
};

export default CollectionNoSidebar;
