import { useContext, useEffect, useState } from "react";
import { RiArrowUpSLine } from "react-icons/ri";
import SettingBox from "../SettingBox";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";

const TapTop = () => {
  const [taptopStyle, setTapTopStyle] = useState("none");
  const { themeOption } = useContext(ThemeOptionContext);

  const executeScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (window.scrollY > 600) {
      setTapTopStyle("block");
    } else {
      setTapTopStyle("none");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="theme-option">
        <SettingBox />
        {themeOption?.general?.back_to_top_enable && (
          <div className="back-to-top" style={{ display: taptopStyle }}>
            <a onClick={() => executeScroll()}>
              <RiArrowUpSLine />
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default TapTop;
