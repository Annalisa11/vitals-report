import { useQuery } from '@tanstack/react-query';
import { VitalsType } from '../App';
import axios from 'axios';
import { BASE_URL } from '../config';

const fetchHistory = async () => {
  const response = await axios.get(`${BASE_URL}/history`);

  return response.data;
};

export const useHistory = () => {
  return useQuery<VitalsType[], Error>({
    queryKey: ['history'],
    queryFn: fetchHistory,
  });
};
