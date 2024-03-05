import { useContext } from 'react';
import { AccordionBody, Input, Label } from 'reactstrap';
import CategoryContext from '@/Helper/CategoryContext';
import { usePathname, useRouter } from 'next/navigation';
import { useCustomSearchParams } from '@/Utils/Hooks/useCustomSearchParams';
import NoDataFound from '@/Components/Common/NoDataFound';

const CollectionCategory = ({ filter, setFilter }) => {
  const [attribute, price, rating, sortBy, field, layout] = useCustomSearchParams(['attribute', 'price', 'rating', 'sortBy', 'field', 'layout']);
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');
  const router = useRouter();
  const pathname = usePathname();
  const redirectToCollection = (event, slug) => {
    event.preventDefault();
    let temp = [...filter?.category];
    if (!temp.includes(slug)) {
      temp.push(slug);
    } else {
      temp = temp.filter((elem) => elem !== slug);
    }
    setFilter((prev) => {
      return {
        ...prev,
        category: temp,
      };
    });
    if (temp.length > 0) {
      const queryParams = new URLSearchParams({ ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout, category: temp }).toString();
      router.push(`${pathname}?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({ ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout }).toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };
  return (
    <AccordionBody accordionId='1'>
      {categoryData?.length > 0 ? (
        <ul className='category-list custom-padding custom-height'>
          {categoryData?.map((elem, i) => (
            <li key={i}>
              <div className='form-check category-list-box'>
                <Input className='checkbox_animated' type='checkbox' id={elem?.name} checked={filter?.category?.includes(elem?.slug)} onChange={(e) => redirectToCollection(e, elem?.slug)} />
                <Label className='form-check-label' htmlFor={elem?.name}>
                  <span className='name'>{elem?.name}</span>
                  <span className='number'>({elem?.products_count})</span>
                </Label>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <NoDataFound data={{ customClass: 'bg-second border-30 no-data-added', title: 'No Category Found' }} />
      )}
    </AccordionBody>
  );
};

export default CollectionCategory;
