import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { useContext } from "react";

const ProductBagde = ({ productDetail }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      {productDetail?.is_sale_enable ? (
        <div className='label-tag sale-tag'>
          <span>{t("SALE")}</span>
        </div>
      ) : productDetail?.is_featured ? (
        <div className='label-tag'>
          <span>{t("Featured")}</span>
        </div>
      ) : null}
    </>
  );
};

export default ProductBagde;
