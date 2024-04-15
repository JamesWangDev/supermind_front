import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { ModalHeader } from "reactstrap";
import CustomModal from "@/Components/Common/CustomModal";
import newsLetterImage from "../../../public/assets/images/newsletter/3.jpg";
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from "@/Helper/I18NextContext";
import Logo from "../../../public/assets/images/logo/1.png";
import Cookies from "js-cookie";

const ExitModal = () => {
  const [showModal, setShowModal] = useState(false);
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");

  useEffect(() => {
    const handleMouseOut = (event) => {
      if (event.clientY <= 0) {
        openModal();
        window.removeEventListener("mouseout", handleMouseOut);
      }
    };

    const modalShown = Cookies.get("exit");

    if (!modalShown) {
      window.addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  const openModal = () => {
    setShowModal(true);
    Cookies.set("exit", "true");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <CustomModal modal={showModal} setModal={setShowModal} classes={{ customChildren: true, modalClass: "modal-lg newsletter-modal theme-modal" }}>
      <ModalHeader className="p-0" toggle={closeModal} />
      <div className="modal-box">
        <div className="modal-image">
          <Image src={newsLetterImage} className="img-fluid" alt="NewsLetter Image" width={400} height={361} />
        </div>
        <div className="modal-content">
          <div>
            <Image src={Logo} className="modal-logo" alt="newsletter" height={17} width={100} />
            <h2 className="text-title">
              {t("Wait")}
              <span className="theme-color">!</span>
            </h2>
            <h5>{t("ImSorry")}</h5>
            <p>{t("imSorryDescription")}</p>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ExitModal;