import { useState } from 'react';
import { RiStarFill, RiStarLine } from 'react-icons/ri';

const ProductBox1Rating = ({ classes = {}, totalRating, clickAble, setFieldValue, name }) => {
  const RatingStar = Array.from({ length: 5 }, (_, index) => index);
  const [rating, setRating] = useState(totalRating);
  const handleRate = (elem) => {
    setRating(elem);
    setFieldValue && name && setFieldValue(name, elem);
  };
  return (
    <>
      {clickAble ? (
        <ul className={`add-rating ${classes?.customClass ? classes?.customClass : ''}`}>
          {RatingStar &&
            RatingStar.map((elem, index) => (
              <li key={elem} onClick={() => handleRate(index + 1)}>
                {index + 1 <= rating ? <RiStarFill /> : <RiStarLine />}
              </li>
            ))}
        </ul>
      ) : (
        <ul className={`rating ${classes?.customClass ? classes?.customClass : ''}`}>
          {RatingStar && RatingStar.map((elem) => <li key={elem}>{elem + 1 <= totalRating ? <RiStarFill /> : <RiStarLine />}</li>)}
        </ul>
      )}
    </>
  );
};

export default ProductBox1Rating;
