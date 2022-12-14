import { useEffect, useState } from 'react';

function useFetch(url) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(url);
        const dataJson = await response.json();
        setData(dataJson);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchFood();
  }, [url]);
  return { data };
}
export default useFetch;
