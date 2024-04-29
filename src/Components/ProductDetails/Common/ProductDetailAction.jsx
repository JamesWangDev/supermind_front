import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { Input, InputGroup } from 'reactstrap';
import Btn from '@/Elements/Buttons/Btn';
import CartContext from '@/Helper/CartContext';
import I18NextContext from '@/Helper/I18NextContext';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import AddToWishlist from '@/Components/Common/ProductBox/AddToWishlist';
import AddToCompare from '@/Components/Common/ProductBox/AddToCompare';
import AddToCartButton from './AddToCartButton';
import CustomModal from '@/Components/Common/CustomModal';
import ChatBox from '@/Components/Chat/ChatBox';
import { SuperpowerChatBox } from '@/Components/Chat/SuperpowerChatBox';
import defaultProductImg from '../../../../public/assets/images/default-product-image.png'
import { PointAPI } from '@/Utils/AxiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import request from '@/Utils/AxiosUtils';

const ProductDetailAction = ({ productState, setProductState, extraOption }) => {
  const [openChat, setOpenChat] = useState(false);
  const { i18Lang } = useContext(I18NextContext);
  const { handleIncDec, isLoading } = useContext(CartContext);
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  const addToCart = () => {
    handleIncDec(productState?.productQty, productState?.product, false, false, false, productState);
  };
  const { data: pointsData, isLoading: pointsDataLoading, refetch: refecthPointsData } = useQuery([PointAPI], () => request({ url: PointAPI, params: { paginate: 10 } }), {
    select: (res) => res?.data,
  });

  useEffect(() => {
    if(productState?.product?.prompts?.length > 0) {
      let prompt_text = "";
      productState?.product?.prompts.map(prompt => {
        prompt_text += prompt.prompt_text;
      })
      setPrompt(prompt_text);
    }
  }, [productState])

  const buyNow = () => {
    // handleIncDec(productState?.productQty, productState?.product, false, false, false, productState);
    // router.push(`/${i18Lang}/checkout`);
    setOpenChat(true);
  };
  const updateQty = (qty) => {
    if (1 > productState?.productQty + qty) return;
    setProductState((prev) => {
      return { ...prev, productQty: productState?.productQty + qty };
    });
    checkStockAvailable();
  };
  const checkStockAvailable = () => {
    if (productState?.selectedVariation) {
      setProductState((prevState) => {
        const tempSelectedVariation = { ...prevState.selectedVariation };
        tempSelectedVariation.stock_status = tempSelectedVariation.quantity < prevState.productQty ? 'out_of_stock' : 'in_stock';
        return {
          ...prevState,
          selectedVariation: tempSelectedVariation,
        };
      });
    } else {
      setProductState((prevState) => {
        const tempProduct = { ...prevState.product };
        tempProduct.stock_status = tempProduct.quantity < prevState.productQty ? 'out_of_stock' : 'in_stock';
        return {
          ...prevState,
          product: tempProduct,
        };
      });
    }
  };

  const getChatbotHeader = (productState, pointData) => {
    return (
      <>
        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center'>
            <span className='me-2'>
              {productState?.product?.product_galleries?.length > 0 ? 
                <img height={580} width={580} src={productState?.product?.product_galleries[0]?.original_url} className='img-fluid' alt={elem?.name} /> : 
                <div style={{width: "40px", height: "40px"}}><Image src={defaultProductImg} height={40} width={40} style={{objectFit: "cover"}} /></div>  
              }
            </span>
            <span>
              {productState?.product?.name}
            </span>
          </div>
          <div>
            Total Points: {pointData?.balance || 0}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='note-box product-package'>
        {/* <div className='cart_qty qty-box product-qty'>
          <InputGroup>
            <Btn type='button' className='qty-right-plus' onClick={() => updateQty(-1)}>
              <RiSubtractLine />
            </Btn>
            <Input className='input-number qty-input' type='number' value={productState?.productQty} readOnly />
            <Btn type='button' className='qty-left-minus' onClick={() => updateQty(1)}>
              <RiAddLine />
            </Btn>
          </InputGroup>
        </div> */}
        {/* {extraOption !== false ? (
          <div className='wishlist-btn-group'>
            <AddToWishlist productObj={productState?.product} customClass={'wishlist-button btn'} />
            <AddToCompare productObj={productState?.product} customClass={'wishlist-button btn'} />
          </div>
        ) : null} */}
      </div>
      <AddToCartButton productState={productState} isLoading={isLoading} addToCart={addToCart} buyNow={buyNow} extraOption={extraOption} />
      <CustomModal modal={openChat} setModal={setOpenChat} fullscreen classes={{modalBodyClass: "full-modal", modalClass: 'theme-modal modal-xl', title: getChatbotHeader(productState, pointsData)}}>
          <iframe style={{width: "100%", height: "100%"}} src={`https://n8n.gpt-autopilot.com/index.php?smessage=${prompt || "normal"}`} title="Supermind chat box"></iframe>
          {/* {productState?.product?.type == "superpower" ? <SuperpowerChatBox productData={productState.product} /> : <ChatBox productData={productState.product} />} */}
      </CustomModal>
    </>
  );
};

const ChatModalHeader = ({productState}) => {
  return (
    <>
      <div className='d-flex'>
        {productState?.product?.product_galleries?.length > 0 ? 
          <img height={580} width={580} src={productState?.product?.product_galleries[0]?.original_url} className='img-fluid' alt={elem?.name} /> : 
          <div style={{width: "580px", height: "580px"}}><Image src={defaultProductImg} height={40} width={40} style={{objectFit: "cover"}} /></div>  
        }
        {productState?.product?.name}
      </div>
    </>
  )
}

export default ProductDetailAction;
