import { useState } from 'react';
import axios from 'axios';
import '@styles/Jokes.scss';
import Logo from '../assets/whatsapp.svg?react';
import Button from './basic/Button';

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

  const createWhatsappShareLink = (joke: Joke) => {
    const message = `${joke.setup} - ${joke.punchline}`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className='jokes'>
      <h2>Do something for David</h2>
      <p>
        Life's tough for David. He's battling diabetes and could use a good
        laugh. Be a friend and brighten his day — hit him with a joke!
      </p>
      <Button onClick={getJoke}>Get me a Joke</Button>
      {joke.setup && (
        <>
          <div className='joke'>
            <p>{joke.setup}</p>
            <p>{joke.punchline}</p>
          </div>
          <a
            href={createWhatsappShareLink(joke)}
            target='_blank'
            rel='noopener noreferrer'
            className='share-button'
          >
            <Logo className='share-button__logo' />
            <span className='share-button__label'>Share on WhatsApp</span>
          </a>
        </>
      )}
    </div>
  );
};

export default Jokes;
