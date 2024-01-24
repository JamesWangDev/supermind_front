import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AccountContext from '.';
import request from '../../Utils/AxiosUtils';
import { SelfAPI } from '@/Utils/AxiosUtils/API';
import Cookies from 'js-cookie';

const AccountProvider = (props) => {
  const cookies = Cookies.get('uat');
  const [mobileSideBar, setMobileSideBar] = useState(false);
  const [accountData, setAccountData] = useState();
  const { data, refetch, isLoading } = useQuery([SelfAPI], () => request({ url: SelfAPI }), {
    enabled: false,
    select: (res) => {
      return res?.data;
    },
  });

  useEffect(() => {
    cookies  && refetch();
  }, [cookies]);

  useEffect(() => {
    if (data) {
      setAccountData(data);
    }
  }, [isLoading, data]);

  return <AccountContext.Provider value={{ ...props, accountData, setAccountData, refetch, mobileSideBar, setMobileSideBar }}>{props.children}</AccountContext.Provider>;
};

export default AccountProvider;
