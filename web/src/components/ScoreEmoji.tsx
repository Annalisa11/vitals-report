import '../styles/ScoreEmoji.scss';
import JSConfetti from 'js-confetti';

type Range = {
  inRange: number;
  belowRange: number;
  aboveRange: number;
};

const ScoreEmoji = () => {
  const data = { inRange: 80, belowRange: 10, aboveRange: 10 };

  const fireConfetti = () => {
    const jsConfetti = new JSConfetti();

    jsConfetti.addConfetti({
      emojis: [getEmoji(data)],
    });
  };

  const getEmoji = (data: Range) => {
    if (data.inRange > 97) {
      return '🏆';
    } else if (data.inRange > 85) {
      return '🥇';
    } else if (data.inRange > 70) {
      return '🥈';
    } else if (data.inRange > 55) {
      return '🥉';
    } else {
      return '😐';
    }
  };

  return (
    <div className='score-emoji' onClick={fireConfetti}>
      <div className='score-emoji__emoji'>{getEmoji(data)}</div>
    </div>
  );
};

export default ScoreEmoji;
