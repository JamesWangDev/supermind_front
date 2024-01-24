import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import React, { useContext } from "react";

const AccountHeading = ({ title }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");

  return (
    <div className="title-header">
      <div className="d-flex align-items-center">
        <h5>{t(title)}</h5>
      </div>
    </div>
  );
};

export default AccountHeading;
