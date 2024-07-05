/* eslint-disable no-empty-pattern */
import { useState } from 'react';
import axios from 'axios';

interface Joke {
  setup: string;
  punchline: string;
}

const Jokes = () => {
  const [joke, setJoke] = useState<Joke>({ setup: '', punchline: '' });

  const getJoke = async () => {
    try {
      const response = await axios.get(
        'https://official-joke-api.appspot.com/jokes/random'
      );
      setJoke(response.data);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  return (
    <div className='jokes'>
      <h2>Do something for David</h2>
      <p>
        Life's tough for David. He's battling diabetes and could use a good
        laugh. Be a friend and brighten his day — hit him with a joke!
      </p>
      <button onClick={getJoke}>Get me a Joke</button>
      {joke.setup && (
        <div className='joke'>
          <p>{joke.setup}</p>
          <p>{joke.punchline}</p>
        </div>
      )}
    </div>
  );
};

export default Jokes;
