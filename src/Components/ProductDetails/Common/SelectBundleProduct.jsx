import Btn from '@/Elements/Buttons/Btn';
import CartContext from '@/Helper/CartContext';
import I18NextContext from '@/Helper/I18NextContext';
import ProductIdsContext from '@/Helper/ProductIdsContext';
import SettingContext from '@/Helper/SettingContext';
import { AddToCartAPI } from '@/Utils/AxiosUtils/API';
import { ToastNotification } from '@/Utils/CustomFunctions/ToastNotification';
import useCreate from '@/Utils/Hooks/useCreate';
import { useTranslation } from '@/app/i18n/client';
import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
// import { RiShoppingCartLine } from 'react-icons/ri';
import { Input, Label } from 'reactstrap';

const SelectBundleProduct = ({ crossSellProduct }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const isLogin = Cookies.get('uat');
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const { convertCurrency } = useContext(SettingContext);
  const { filteredProduct } = useContext(ProductIdsContext);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const { data: addData, mutate, isLoading } = useCreate(AddToCartAPI, false, false, 'No');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const onProductCheck = (event) => {
    event.stopPropagation();
    const productId = Number(event?.target?.value);
    if (event.target.checked) {
      setSelectedProductIds((prev) => [...prev, productId]);
    } else {
      setSelectedProductIds((prev) => prev.filter((id) => id !== productId));
    }
  };
  useEffect(() => {
    const selected = filteredProduct?.filter((elem) => selectedProductIds?.includes(elem?.id));
    setSelectedProducts(selected);
    const newTotal = selected.reduce((sum, item) => sum + item.sale_price, 0);
    setTotal(newTotal);
  }, [selectedProductIds, filteredProduct]);

  const addToCart = (qty, products) => {
    let cloneCart = [...cartProducts];
    if (products.length) {
      products.forEach((elem) => {
        const index = cloneCart?.findIndex((item) => item?.product_id === elem.id);
        const productStockQty = cloneCart[index]?.product?.quantity;
        if (productStockQty < cloneCart[index]?.quantity + qty) {
          ToastNotification('error', `You can not add more items than available. In stock ${productStockQty} items.`);
          return false;
        }
        if (index !== -1) {
          let temp = { ...cloneCart[index], quantity: cloneCart[index].quantity + qty, sub_total: (cloneCart[index].quantity + qty) * cloneCart[index]?.product?.sale_price };
          setCartProducts((prev) => [...prev.filter((value) => value?.product_id !== cloneCart[index]?.product_id), temp]);
        } else {
          let params = { product: elem, product_id: elem.id, quantity: qty, sub_total: elem?.sale_price, };
          setCartProducts((prev) => [...prev, params]);
        }
        let obj = { product: elem, product_id: elem.id, quantity: qty, sub_total: elem?.sale_price, variation_id: null, };
        isLogin && mutate(obj);
      });
    }
  };
  return (
    <div className='budle-list'>
      <ul>
        {crossSellProduct.map((elem, i) => (
          <li key={i}>
            <div className='form-check'>
              <Input className='checkbox_animated' type='checkbox' value={elem?.id} id={`crossSell-${elem?.id}`} onChange={(e) => onProductCheck(e)} />
              <Label className='form-check-label' htmlFor={`crossSell-${elem?.id}`}>
                <span className='color color-1'>{elem?.name}<span className='ms-1'>{convertCurrency(elem?.sale_price)}</span></span>
              </Label>
            </div>
          </li>
        ))}
        <li className='contant'>
          <h5>{t("ProductSelectedFor")}</h5>
          <h4 className='theme-color'>{convertCurrency(total)}</h4>
          <Btn title='AddAllToCart' loading={Number(isLoading)} disabled={!total} className='text-white theme-bg-color btn-md mt-sm-4 mt-3 fw-bold' onClick={(e) => addToCart(1, selectedProducts)}>
            {/* <RiShoppingCartLine className='me-2' /> */}
          </Btn>
        </li>
      </ul>
    </div>
  );
};

export default SelectBundleProduct;
