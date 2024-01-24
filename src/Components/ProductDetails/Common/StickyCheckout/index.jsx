import { useEffect, useState } from 'react';
import ShowProduct from './ShowProduct';

const StickyCheckout = ({ ProductData }) => {
  const [productState, setProductState] = useState({ product: ProductData, attributeValues: [], productQty: 1, selectedVariation: '', variantIds: [] });

  useEffect(() => {
    if (ProductData) {
      setProductState({ ...productState, product: ProductData });
    }
  }, [ProductData]);

  return <ShowProduct productState={productState} setProductState={setProductState} />;
};

export default StickyCheckout;
