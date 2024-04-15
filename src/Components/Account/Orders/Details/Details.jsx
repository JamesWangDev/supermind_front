// import Link from 'next/link';
// import { RiDownload2Fill, RiRefreshLine } from 'react-icons/ri';
import Loader from '@/Layout/Loader';
import request from '@/Utils/AxiosUtils';
import { OrderAPI } from '@/Utils/AxiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import DetailStatus from './DetailStatus';
import DetailTitle from './DetailTitle';
import DetailsTable from './DetailsTable';
import DetailsConsumer from './DetailsConsumer';

const Details = ({ params }) => {
  const { data, isLoading, refetch } = useQuery([OrderAPI, params], () => request({ url: `${OrderAPI}/${params}` }), {
    enabled: true,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  if (isLoading) return <Loader />;
  return (
    <>
      <DetailTitle params={params} data={data} />
      {/* <DetailStatus data={data} /> */}
      <DetailsTable data={data} />
      <DetailsConsumer data={data} />
    </>
  );
};

export default Details;
