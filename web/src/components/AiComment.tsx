import { useEffect } from 'react';
import { useAIComment } from '@hooks/useAIComment';
import '@styles/AiComment.scss';
import { VitalsType } from '@/types/types';

interface Props {
  vitals: VitalsType | undefined;
}

const AiComment = ({ vitals }: Props) => {
  const {
    mutate: generateComment,
    data: sarcasticComment,
    isPending: commentLoading,
  } = useAIComment();

  useEffect(() => {
    if (vitals) {
      generateComment(vitals);
    }
  }, [vitals, generateComment]);

  return (
    <div className='comment'>
      {commentLoading ? (
        <div className='loader'></div>
      ) : (
        <p>{sarcasticComment}</p>
      )}
    </div>
  );
};

export default AiComment;
