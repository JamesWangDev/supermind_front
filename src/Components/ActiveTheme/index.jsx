'use client';
import Loader from '@/Layout/Loader';
import request from '@/Utils/AxiosUtils';
import { ThemeAPI } from '@/Utils/AxiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import ParisTheme from '../ParisTheme';
import TokyoTheme from '../TokyoTheme';
import OsakaTheme from '../OsakaTheme';
import RomeTheme from '../RomeTheme';
import MadridTheme from '../MadridTheme';
import BerlinTheme from '../BerlinTheme';
import DenverTheme from '../DenverTheme';

const ActiveTheme = () => {
  const { data, isLoading } = useQuery([ThemeAPI], () => request({ url: ThemeAPI }), {
    enabled: true,
    refetchOnWindowFocus: false,
    select: (res) => res?.data.data,
  });
  if (isLoading) return <Loader />;

  const checkActive = {
    paris: <ParisTheme />,
    tokyo: <TokyoTheme />,
    osaka: <OsakaTheme />,
    rome: <RomeTheme />,
    madrid: <MadridTheme />,
    berlin: <BerlinTheme />,
    denver: <DenverTheme />,
  };
  const activeTheme = data?.find((elem) => elem.status === 1);

  return checkActive[activeTheme?.slug];
};

export default ActiveTheme;
