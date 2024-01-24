'use client';
import React, { useEffect, useState } from 'react';
import ThemeOptionContext from '.';
import { useQuery } from '@tanstack/react-query';
import { ThemeOptionsAPI } from '@/Utils/AxiosUtils/API';
import request from '@/Utils/AxiosUtils';

const ThemeOptionProvider = (props) => {
  const [openOffCanvas, setOpenOffCanvas] = useState(false);
  const [cartCanvas, setCartCanvas] = useState(false);
  const [mobileSideBar, setMobileSideBar] = useState(false);
  const [collectionMobile, setCollectionMobile] = useState(false);
  const [themeOption, setThemeOption] = useState({});
  const { data, isLoading, refetch } = useQuery([ThemeOptionsAPI], () => request({ url: ThemeOptionsAPI }), {
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    if (data) {
      setThemeOption(data?.options);
    }
  }, [isLoading]);
  return (
    <>
      <ThemeOptionContext.Provider
        value={{ ...props, themeOption, openOffCanvas, setOpenOffCanvas, cartCanvas, setCartCanvas, mobileSideBar, setMobileSideBar, collectionMobile, setCollectionMobile }}>
        {props.children}
      </ThemeOptionContext.Provider>
    </>
  );
};

export default ThemeOptionProvider;
