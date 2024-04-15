import Image from 'next/image';

const Avatar = ({ data, placeHolder, name, customeClass, customImageClass, height, width }) => {
  return (
    <>
      {data?.original_url ? (
        <div className={`${customeClass ? customeClass : ''}`}>
          <img className={customImageClass ? customImageClass : ''} src={data?.original_url} height={height || 50} width={width || 50} alt={name?.name || name || ''} />
        </div>
      ) : placeHolder ? (
        <div className={`${customeClass ? customeClass : ''}`}>
          <Image className={customImageClass ? customImageClass : ''} src={placeHolder} height={height || 50} width={width || 50} alt={name?.name || name || ''} />
        </div>
      ) : (
        <h1>{name?.name?.charAt(0).toString().toUpperCase() || name?.charAt(0).toString().toUpperCase()}</h1>
      )}
    </>
  );
};

export default Avatar;
