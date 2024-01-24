import React, { useContext } from 'react';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import OfferBanner from '@/Components/ParisTheme/OfferBanner';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import CollectionSidebar from '../CollectionSidebar';
import MainCollection from '../MainCollection';

const CollectionRightSidebar = ({ filter, setFilter }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <>
      <WrapperComponent colProps={{ xs: 12 }}>
        {themeOption?.collection?.collection_banner_image_url && (
          <OfferBanner classes={{ customHoverClass: 'banner-contain hover-effect' }} imgUrl={themeOption?.collection?.collection_banner_image_url} />
        )}
      </WrapperComponent>
      <WrapperComponent classes={{ sectionClass: 'section-b-space shop-section' }} customCol={true}>
        <MainCollection filter={filter} setFilter={setFilter} />
        <CollectionSidebar filter={filter} setFilter={setFilter} rightSideClass='right-box' />
      </WrapperComponent>
    </>
  );
};

export default CollectionRightSidebar;
