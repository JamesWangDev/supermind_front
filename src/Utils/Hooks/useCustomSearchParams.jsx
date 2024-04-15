import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const useCustomSearchParams = (keys) => {
  const [getParams, setGetParams] = useState([]);
  const searchParams = useSearchParams();
  useEffect(() => {
    if (keys.length > 0) {
      const paramsArray = keys.map((elem) => {
        const value = searchParams.get(elem);
        if (value !== null) return { [elem]: value };
      });

      setGetParams(paramsArray);
    }
  }, [searchParams]);
  return getParams || [];
};

export { useCustomSearchParams };
