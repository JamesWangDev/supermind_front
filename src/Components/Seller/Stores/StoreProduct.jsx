import Image from 'next/image';
import { placeHolderImage } from '../../../../Data/CommonPath';

const StoreProduct = ({ elem }) => {
  return (
    <>
      <ul className='product-image'>
        {elem?.product_images?.slice(0, 3)?.map((data, i) => (
          <li key={i}>
            {data ? <img src={data} height={32} width={32} alt='Store' /> : <Image src={placeHolderImage} height={32} width={32} alt='Store' />}
          </li>
        ))}
        {elem?.products_count > 3 ? <li>+{elem?.products_count - 3}</li> : null}
      </ul>
    </>
  );
};

export default StoreProduct;
