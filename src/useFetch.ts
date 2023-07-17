import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';

const useFetch = (url: string, key: string) => {
  const { data, error, refetch, isLoading } = useQuery([key], async () => {
    const res = await Axios.get(url);
    return res.data;
  });

  if (error) {
    console.log(error);
  }

  return { data, refetch, isLoading };
};

export default useFetch;
