import ProductBox1Rating from '@/Components/Common/ProductBox/ProductBox1/ProductBox1Rating';
import I18NextContext from '@/Helper/I18NextContext';
import { useCustomSearchParams } from '@/Utils/Hooks/useCustomSearchParams';
import { useTranslation } from '@/app/i18n/client';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { AccordionBody, AccordionHeader, AccordionItem, Input } from 'reactstrap';

const CollectionRating = ({ filter, setFilter, attributeAPIData }) => {
  const RatingNumber = Array.from({ length: 5 }, (_, i) => i + 1).reverse();
  const router = useRouter();
  const [category, attribute, price, sortBy, field, layout, type] = useCustomSearchParams(['category', 'attribute', 'price', 'sortBy', 'field', 'layout', 'type']);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const pathname = usePathname();
  const checkRating = (value) => {
    if (filter?.rating?.indexOf(value) != -1) {
      return true;
    } else return false;
  };
  const applyRating = (event) => {
    const index = filter?.rating.indexOf(event?.target?.value);
    let temp = [...filter?.rating];
    if (event.target.checked) {
      temp.push(event?.target?.value);
    } else {
      temp.splice(index, 1);
    }
    setFilter((prev) => {
      return {
        ...prev,
        rating: temp,
      };
    });
    if (temp.length > 0) {
      const queryParams = new URLSearchParams({ ...category, ...attribute, ...price, ...sortBy, ...field, ...layout, ...type, rating: temp }).toString();
      router.push(`${pathname}?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({ ...category, ...attribute, ...price, ...sortBy, ...field, ...layout, ...type }).toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };
  return (
    <AccordionItem>
      <AccordionHeader targetId={(attributeAPIData?.length + 3).toString()}>
        <span>{t('Rating')}</span>
      </AccordionHeader>
      <AccordionBody accordionId={(attributeAPIData?.length + 3).toString()}>
        <ul className='category-list custom-padding'>
          {RatingNumber.map((elem, i) => (
            <li key={i}>
              <div className='form-check m-0 category-list-box'>
                <Input className='checkbox_animated' type='checkbox' value={elem} checked={checkRating(elem.toString())} onChange={applyRating} />
                <div className='form-check-label'>
                  <ProductBox1Rating totalRating={elem} />
                  <span className='text-content'>
                    ({elem} {t('Star')})
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </AccordionBody>
    </AccordionItem>
  );
};

export default CollectionRating;
