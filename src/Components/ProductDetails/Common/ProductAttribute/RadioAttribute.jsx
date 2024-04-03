import { Fragment } from 'react';
import { Input, Label } from 'reactstrap';

const RadioAttribute = ({ elem, soldOutAttributesIds, productState, setVariant, i }) => {
  return (
    <div className='d-flex'>
      {elem?.attribute_values.map((value, index) => (
        <Fragment key={index}>
          {productState?.attributeValues?.includes(value?.id) ? (
            <div className={`form-check ${soldOutAttributesIds.includes(value.id) ? 'disabled' : ''}`}>
              <Input
                type='radio'
                className='form-check-input'
                id={`radio-${i}-${index}`}
                name={`radio-group-${i}`}
                value={index}
                checked={productState?.variantIds?.includes(value?.id)}
                disabled={soldOutAttributesIds.includes(value.id)}
                onChange={(e) => setVariant(productState?.product?.variations, elem?.attribute_values[e.target.value])}
              />
              <Label htmlFor={`radio-${i}-${index}`} className='form-check-label'>
                {value?.value}
              </Label>
            </div>
          ) : null}
        </Fragment>
      ))}
    </div>
  );
};

export default RadioAttribute;
