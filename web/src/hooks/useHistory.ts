import { useQuery } from '@tanstack/react-query';
import { GlucoseScoreResult, VitalsType } from '@/App';
import axios from 'axios';
import { BASE_URL } from '@/config';

const fetchHistory = async () => {
  const response = await axios.get(`${BASE_URL}/history`);

  return response.data;
};

const fetchGlucoseScore = async () => {
  const response = await axios.get(`${BASE_URL}/glucose-score`);

  return response.data;
};

export const useHistory = () => {
  return useQuery<VitalsType[], Error>({
    queryKey: ['history'],
    queryFn: fetchHistory,
  });
};

const useGlucoseScore = () => {
  return useQuery<GlucoseScoreResult, Error>({
    queryKey: ['glucoseScore'],
    queryFn: fetchGlucoseScore,
  });
};

const hooks = {
  useHistory,
  useGlucoseScore,
};

export default hooks;
