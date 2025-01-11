import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '@/config';
import { VitalsType } from '@/types/types';

const fetchVitals = async () => {
  const response = await axios.get(`${BASE_URL}/vitals`);

  return response.data;
};

export const useVitals = (isLoggedIn: boolean) => {
  return useQuery<VitalsType, Error>({
    queryKey: ['vitals'],
    queryFn: fetchVitals,
    refetchInterval: 5 * 60 * 1000,
    enabled: isLoggedIn,
  });
};
