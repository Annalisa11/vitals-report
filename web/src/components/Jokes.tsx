import { useState } from 'react';
import axios from 'axios';
import '../styles/Jokes.scss';
import Logo from '../assets/whatsapp.svg?react';

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
      <button onClick={getJoke}>Get me a Joke</button>
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
            className='logo-link'
          >
            <Logo className='logo' />
            <span>Share on WhatsApp</span>
          </a>
        </>
      )}
    </div>
  );
};

export default Jokes;
