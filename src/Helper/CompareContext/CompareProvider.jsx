import React, { useEffect, useState } from 'react';
import CompareContext from '.';
import Cookies from 'js-cookie';
import { CompareAPI } from '@/Utils/AxiosUtils/API';
import request from '@/Utils/AxiosUtils';
import { useQuery } from '@tanstack/react-query';

const CompareProvider = (props) => {
  const cookieUAT = Cookies.get('uat');
  const [compareState, setCompareState] = useState([]);
  const {
    data: CompareData,
    isLoading: getCompareLoading,
    refetch,
  } = useQuery([CompareAPI], () => request({ url: CompareAPI }), { enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data?.data });
  useEffect(() => {
    if (cookieUAT) {
      refetch();
    }
  }, [cookieUAT]);
  useEffect(() => {
    if (CompareData) {
      setCompareState([...compareState, ...CompareData]);
    }
  }, [getCompareLoading]);
  return <CompareContext.Provider value={{ ...props, compareState, setCompareState, refetch }}>{props.children}</CompareContext.Provider>;
};

export default CompareProvider;
