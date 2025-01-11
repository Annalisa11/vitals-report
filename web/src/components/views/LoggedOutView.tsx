import GlucoseBox from '@components/GlucoseBox';
import Button from '@components/basic/Button';
import Jokes from '@components/Jokes';
import { useGuesses } from '@hooks/useGuesses';
import { FormEvent, useState } from 'react';

const LoggedOutView = () => {
  const [glucoseValue, setGlucoseValue] = useState<number | undefined>();

  const { guesses, score, tryGuess } = useGuesses();

  const handleGlucoseSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (guesses <= 0 || !glucoseValue) return;
    tryGuess(glucoseValue);
  };

  return (
    <main>
      <div className='glucose-guessing-container'>
        <h2>Guess the Glucose!</h2>
        <GlucoseBox ValueInMgPerDl={glucoseValue} />
        <form onSubmit={handleGlucoseSubmit} className='guess-form'>
          <div>
            <div className='guess-form__guess-count'>
              {guesses <= 0
                ? 'NO MORE GUESSES :('
                : `Guesses remaining: ${guesses}`}
            </div>
            <div className='guess-form__input-row'>
              <input
                className='guess-form__input'
                type='number'
                value={glucoseValue}
                onChange={(e) => {
                  setGlucoseValue(
                    Number(e.target.value) === 0
                      ? undefined
                      : Number(e.target.value)
                  );
                }}
              />
              <Button type='submit' disabled={guesses <= 0}>
                Guess
              </Button>
            </div>
          </div>
          <div>{score}</div>
        </form>
      </div>

      <Jokes />
    </main>
  );
};

export default LoggedOutView;
