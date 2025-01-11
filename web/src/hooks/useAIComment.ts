import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '@/config';
import { GlucoseScore, VitalsType } from '@/App';

const generateSarcasticComment = async (vitals: VitalsType) => {
  const prompt = `Generate a message with a very short heading with a fitting emoji, followed by a short, funny and sarcastic text that comments on these diabetes vitals: ${JSON.stringify(
    vitals
  )}. Avoid using specific values from the vitals. Address the text to David.`;

  const response = await axios.post(`${BASE_URL}/openai`, { prompt });
  return response.data.message;
};

const generateGlucoseScoreComment = async (glucoseScore: GlucoseScore) => {
  const prompt = `a funny comment with max 5 words representing a score summary of this glucose data: ${JSON.stringify(
    glucoseScore
  )}`;

  const response = await axios.post(`${BASE_URL}/glucose-score`, { prompt });
  return response.data.message;
};

export const useAIComment = () => {
  return useMutation({ mutationFn: generateSarcasticComment });
};

export const useGlucoseScore = () => {
  return useMutation({ mutationFn: generateGlucoseScoreComment });
};
