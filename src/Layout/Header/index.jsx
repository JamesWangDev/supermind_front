"use client";
import I18NextContext from "@/Helper/I18NextContext";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import { usePathname } from "next/navigation";
import { useContext, useMemo } from "react";
import { headerOptionsMap } from "../../../Data/LayoutData";
import StandardHeader from "./StandardHeader";
import MinimalHeader from "./MinimalHeader";
import BasicHeader from "./BasicHeader";
import ClassicHeader from "./ClassicHeader";

const MainHeader = () => {
  const pathName = usePathname();
  const { i18Lang } = useContext(I18NextContext);
  let currentPath = pathName.split(`/${i18Lang}`)[1];
  const { themeOption } = useContext(ThemeOptionContext);
  const headerList = {
    basic_header: <BasicHeader />,
    classic_header: <ClassicHeader />,
    minimal_header: <MinimalHeader />,
    standard_header: <StandardHeader />,
  };
  const showHeader = useMemo(() => {
    return headerOptionsMap[currentPath] || themeOption?.header?.header_options;
  }, [pathName, themeOption?.header?.header_options]);
  return headerList[showHeader] || <BasicHeader />;
};

export default MainHeader;