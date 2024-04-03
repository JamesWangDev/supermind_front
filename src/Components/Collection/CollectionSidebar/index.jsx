import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AccordionHeader, AccordionItem, UncontrolledAccordion } from 'reactstrap';
import CollectionCategory from './CollectionCategory';
import request from '@/Utils/AxiosUtils';
import { AttributesAPI } from '@/Utils/AxiosUtils/API';
import CollectionAttributes from './CollectionAttributes';
import CollectionFilter from './CollectionFilter';
import CollectionPrice from './CollectionPrice';
import CollectionRating from './CollectionRating';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { RiCloseFill } from 'react-icons/ri';

const CollectionSidebar = ({ filter, setFilter, isOffcanvas, basicStoreCard, rightSideClass, sellerClass, isAttributes = true }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { collectionMobile, setCollectionMobile } = useContext(ThemeOptionContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const { data: attributeAPIData, refetch } = useQuery([AttributesAPI], () => request({ url: AttributesAPI, params: { status: 1 } }), {
    enabled: true,
    refetchOnWindowFocus: false,
    select: (res) => res?.data?.data,
  });
  const defaultOpenList = Array.from({ length: attributeAPIData?.length + 3 }, (_, index) => (index + 1).toString());
  return (
    <>
      {collectionMobile && <div className='bg-overlay show' onClick={() => setCollectionMobile(false)} />}
      <div className={`${sellerClass ? sellerClass : `col-custome-${isOffcanvas ? '12' : '3'}`} `}>
        <div className={`left-box ${rightSideClass ? rightSideClass : ''} ${collectionMobile ? 'show' : ''}`}>
          <div className='shop-left-sidebar'>
            <div className='back-button' onClick={() => setCollectionMobile((prev) => !prev)}>
              <h3>
                <a className='text-title'>
                  <RiCloseFill />
                  <span>{t('Back')}</span>
                </a>
              </h3>
            </div>
            {basicStoreCard && basicStoreCard}
            {!isOffcanvas && <CollectionFilter filter={filter} setFilter={setFilter} />}
            {attributeAPIData && (
              <UncontrolledAccordion className='accordion custome-accordion' open={open} toggle={toggle} stayOpen defaultOpen={defaultOpenList}>
                <AccordionItem>
                  <AccordionHeader targetId='1'>
                    <span>{t('Categories')}</span>
                  </AccordionHeader>
                  <CollectionCategory filter={filter} setFilter={setFilter} />
                </AccordionItem>
                {isAttributes ? <CollectionAttributes attributeAPIData={attributeAPIData} filter={filter} setFilter={setFilter} /> : null}

                <CollectionPrice filter={filter} setFilter={setFilter} attributeAPIData={attributeAPIData} />
                <CollectionRating filter={filter} setFilter={setFilter} attributeAPIData={attributeAPIData} />
              </UncontrolledAccordion>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionSidebar;
