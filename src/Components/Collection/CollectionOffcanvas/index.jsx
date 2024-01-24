import { useContext } from 'react';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import MainCollection from '../MainCollection';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import CollectionSidebar from '../CollectionSidebar';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const CollectionOffCanvas = ({ filter, setFilter }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { openOffCanvas, setOpenOffCanvas } = useContext(ThemeOptionContext);
  const toggle = () => {
    setOpenOffCanvas(!openOffCanvas);
  };
  return (
    <>
      <WrapperComponent classes={{ sectionClass: 'section-b-space shop-section' }} customCol={true}>
        <MainCollection filter={filter} setFilter={setFilter} isOffcanvas={true} />
      </WrapperComponent>
      <Offcanvas toggle={toggle} isOpen={openOffCanvas} className='shop-offcanvas-filter'>
        <OffcanvasHeader toggle={toggle}>{t('Back')}</OffcanvasHeader>
        <OffcanvasBody>
          <CollectionSidebar filter={filter} setFilter={setFilter} isOffcanvas={true} />
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
};

export default CollectionOffCanvas;
