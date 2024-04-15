import { RiBankLine, RiCoinLine, RiFileTextLine, RiHomeLine, RiNotificationLine, RiWalletLine, RiMapPinLine } from 'react-icons/ri';

export const sidebarMenu = [
  {
    title: 'Dashboard',
    icon: <RiHomeLine />,
    id: 'dashboard',
    path: '/account/dashboard',
  },
  {
    title: 'MyOrders',
    icon: <RiFileTextLine />,
    id: 'order',
    path: '/account/order',
  },
  // {
  //   title: 'Notification',
  //   icon: <RiNotificationLine />,
  //   id: 'notification',
  //   path: '/account/notification',
  // },
  // {
  //   title: 'BankDetails',
  //   icon: <RiBankLine />,
  //   id: 'bank-details',
  //   path: '/account/bank-details',
  // },
  {
    title: 'MyWallet',
    icon: <RiWalletLine />,
    id: 'wallet',
    path: '/account/wallet',
  },
  // {
  //   title: 'EarningPoints',
  //   icon: <RiCoinLine />,
  //   id: 'point',
  //   path: '/account/point',
  // },
  // {
  //   title: 'RefundHistory',
  //   icon: <RiMapPinLine />,
  //   id: 'refund',
  //   path: '/account/refund',
  // },
  // {
  //   title: 'SavedAddress',
  //   icon: <RiMapPinLine />,
  //   id: 'address',
  //   path: '/account/addresses',
  // },
];
