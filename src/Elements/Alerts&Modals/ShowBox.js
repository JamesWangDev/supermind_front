import { useTranslation } from "next-i18next";
import React from "react";
import { BiCheckShield, BiError } from "react-icons/bi";
import { motion } from "framer-motion";

const ShowBox = ({ showBoxMessage }) => {
  const { t } = useTranslation("common");
  if (!showBoxMessage) return null;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 1 }} transition={{ duration: 0.5 }} className={showBoxMessage ? "error-box" : "success-box"}>
      {showBoxMessage ? <BiError /> : <BiCheckShield />}
      <div>
        <h4>{showBoxMessage ? t("ThereWasAProblem") : t("Success")} </h4>
        <p>{t(showBoxMessage)}</p>
      </div>
    </motion.div>
  );
};

export default ShowBox;
