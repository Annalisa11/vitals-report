import hooks from '../hooks/useHistory';
import '../styles/ScoreEmoji.scss';
import JSConfetti from 'js-confetti';

const ScoreEmoji = () => {
  const { useGlucoseScore } = hooks;

  const { data: data } = useGlucoseScore();
  const emoji = data?.emoji;
  if (!emoji || !data) {
    return;
  }

  const fireConfetti = () => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: [emoji],
    });
  };

  return (
    <div className='score-emoji' onClick={fireConfetti}>
      <div className='score-emoji__emoji'>{emoji}</div>
    </div>
  );
};

export default ScoreEmoji;
