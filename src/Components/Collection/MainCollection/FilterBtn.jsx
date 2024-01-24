import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { useTranslation } from '@/app/i18n/client';
import { RiFilter2Fill } from 'react-icons/ri';

const FilterBtn = ({ isOffcanvas }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { openOffCanvas, setOpenOffCanvas } = useContext(ThemeOptionContext);
  return (
    <>
      {isOffcanvas && (
        <div className='sidebar-filter-menu'>
          <a onClick={() => setOpenOffCanvas(!openOffCanvas)}>
            <RiFilter2Fill /> {t('FilterMenu')}
          </a>
        </div>
      )}
    </>
  );
};

export default FilterBtn;
