import Avatar from '@/Components/Common/Avatar';

const StoreImage = ({ customClass, elem, height, width }) => {
  return (
    <div className={customClass ? customClass : ''}>
      <Avatar data={elem?.store_logo} name={elem?.store_name} height={height} width={width} />
    </div>
  );
};

export default StoreImage;
