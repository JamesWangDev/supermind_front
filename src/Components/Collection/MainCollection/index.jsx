import { useContext, useEffect, useState } from 'react';
import FilterSort from './FilterSort';
import GridBox from './GridBox';
import CollectionProducts from './CollectionProducts';
import OfferBanner from '@/Components/ParisTheme/OfferBanner';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import FilterBtn from './FilterBtn';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { useCustomSearchParams } from '@/Utils/Hooks/useCustomSearchParams';
import { RiFilterFill } from 'react-icons/ri';

const MainCollection = ({ filter, setFilter, isBanner, isOffcanvas, classicStoreCard, initialGrid = 4, noSidebar, sellerClass }) => {
  const [grid, setGrid] = useState(initialGrid);
  const { themeOption, setCollectionMobile } = useContext(ThemeOptionContext);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [layout] = useCustomSearchParams(['layout']);
  useEffect(() => {
    if (layout?.layout == 'collection_3_grid') {
      setGrid(3);
    } else if (layout?.layout == 'collection_4_grid') {
      setGrid(4);
    } else if (layout?.layout == 'collection_5_grid') {
      setGrid(5);
    } else if (layout?.layout == 'collection_list_view') {
      setGrid('list');
    }
  }, [layout]);
  return (
    <div className={`${sellerClass ? sellerClass : `col-custome-${isOffcanvas || noSidebar ? '12' : '9'}`}`}>
      {classicStoreCard && classicStoreCard}
      {isBanner && themeOption?.collection?.collection_banner_image_url && (
        <OfferBanner classes={{ customHoverClass: 'banner-contain hover-effect mb-4' }} imgUrl={themeOption?.collection?.collection_banner_image_url} />
      )}
      <div className='show-button'>
        <div className='filter-button-group mt-0'>
          <div className='filter-button d-inline-block d-lg-none' onClick={() => setCollectionMobile((prev) => !prev)}>
            <a>
              <RiFilterFill /> {t('FilterMenu')}
            </a>
          </div>
        </div>
        <div className={`top-filter-menu${isOffcanvas ? '-2' : ''}`}>
          <FilterBtn isOffcanvas={isOffcanvas} />
          <FilterSort filter={filter} setFilter={setFilter} />
          <GridBox grid={grid} setGrid={setGrid} />
        </div>
      </div>
      <CollectionProducts filter={filter} grid={grid} />
    </div>
  );
};

export default MainCollection;
