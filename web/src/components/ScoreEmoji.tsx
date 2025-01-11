import { useContext, useEffect, useState } from 'react';
import hooks from '@hooks/useHistory';
import '@styles/ScoreEmoji.scss';
import JSConfetti from 'js-confetti';
import { ThemeContext } from '@providers/ThemeContext';

const ScoreEmoji = () => {
  const { useGlucoseScore } = hooks;
  const [emojis, setEmojis] = useState<string[]>([]);
  const { theme } = useContext(ThemeContext);

  const { data: data } = useGlucoseScore();
  const score = data?.emoji;

  useEffect(() => {
    const timer = setTimeout(() => {
      const style = getComputedStyle(document.documentElement);
      const temp = [
        style.getPropertyValue('--emoji-1').trim(),
        style.getPropertyValue('--emoji-2').trim(),
        style.getPropertyValue('--emoji-3').trim(),
        style.getPropertyValue('--emoji-4').trim(),
        style.getPropertyValue('--emoji-5').trim(),
      ];
      setEmojis(temp);
    }, 50);

    return () => clearTimeout(timer);
  }, [theme]);

  if (!score || !data) {
    return;
  }

  const fireConfetti = () => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: [emojis[score]],
    });
  };

  return (
    <div className='score-emoji' onClick={fireConfetti}>
      <div className='score-emoji__emoji'>{emojis[score]}</div>
    </div>
  );
};

export default ScoreEmoji;
