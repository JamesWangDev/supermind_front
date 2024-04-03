import { usePathname, useRouter } from 'next/navigation';
import { AccordionBody, AccordionHeader, AccordionItem, Input, Label } from 'reactstrap';
import { useCustomSearchParams } from '@/Utils/Hooks/useCustomSearchParams';

const CollectionAttributes = ({ attributeAPIData, filter, setFilter }) => {
  const router = useRouter();
  const [category, price, rating, sortBy, field, layout] = useCustomSearchParams(['category', 'price', 'rating', 'sortBy', 'field', 'layout']);
  const pathname = usePathname();
  const checkAttribute = (slug) => {
    if (filter?.attribute?.indexOf(slug) != -1) {
      return true;
    } else return false;
  };
  const applyAttribute = (event) => {
    const index = filter.attribute.indexOf(event?.target?.value);
    let temp = [...filter?.attribute];
    if (event.target.checked) {
      temp.push(event?.target?.value);
    } else {
      temp.splice(index, 1);
    }
    setFilter((prev) => {
      return {
        ...prev,
        attribute: temp,
      };
    });
    if (temp.length > 0) {
      const queryParams = new URLSearchParams({ ...category, ...price, ...rating, ...sortBy, ...field, ...layout, attribute: temp }).toString();
      router.push(`${pathname}?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({ ...category, ...price, ...rating, ...sortBy, ...field, ...layout }).toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };
  return (
    <>
      {attributeAPIData?.length > 0 &&
        attributeAPIData?.map((attribute, i) => (
          <AccordionItem key={i}>
            <AccordionHeader targetId={(i + 2).toString()}>
              <span>{attribute?.name}</span>
            </AccordionHeader>
            {attribute?.attribute_values?.length > 0 &&
              attribute?.attribute_values.map((value, index) => (
                <AccordionBody accordionId={(i + 2).toString()} key={index}>
                  <ul className='category-list custom-padding'>
                    <li>
                      <div className='form-check m-0 category-list-box'>
                        <Input className='checkbox_animated' type='checkbox' value={value?.slug} id={value?.value} checked={checkAttribute(value?.slug)} onChange={applyAttribute} />
                        <Label className='form-check-label color-label-box' htmlFor={value?.value}>
                          {attribute?.style === 'color' && <div className='color-box' style={{ backgroundColor: value?.hex_color }}></div>}
                          <span className='name'>{value?.value}</span>
                        </Label>
                      </div>
                    </li>
                  </ul>
                </AccordionBody>
              ))}
          </AccordionItem>
        ))}
    </>
  );
};

export default CollectionAttributes;
