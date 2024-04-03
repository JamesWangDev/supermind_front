import { useContext, useEffect, useState } from 'react';
import { RiTimeLine } from 'react-icons/ri';
import Loader from '@/Layout/Loader';
import request from '@/Utils/AxiosUtils';
import { MarkAsReadAPI, NotificationAPI } from '@/Utils/AxiosUtils/API';
import { dateFormate } from '@/Utils/CustomFunctions/DateFormate';
import { useQuery } from '@tanstack/react-query';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import AccountHeading from '@/Components/Common/AccountHeading';
import useCreate from '@/Utils/Hooks/useCreate';

const NotificationData = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [isRead, setIsRead] = useState('');
  const { data, isLoading } = useQuery([NotificationAPI], () => request({ url: NotificationAPI }), { enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data?.data });
  const { mutate } = useCreate(MarkAsReadAPI, false, false, 'No', (resDta) => {
    if (resDta.status === 200 || resDta.status === 201) {
      setIsRead('read');
    }
  });
  useEffect(() => {
    return () => {
      mutate({ _method: 'PUT' });
    };
  }, []);
  if (isLoading) return <Loader />;
  return (
    <>
      <AccountHeading title='Notifications' />
      <ul className='notification-list'>
        {data?.map((elem, i) => (
          <li className={!elem?.read_at && isRead !== 'read' ? 'unread' : ''} key={i}>
            <h4>{elem?.data?.message}</h4>
            <h5>
              <RiTimeLine /> {dateFormate(elem?.created_at)}
            </h5>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NotificationData;
