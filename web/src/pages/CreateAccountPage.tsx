import axios from 'axios';
import { BASE_URL } from '../config';
import { FormEvent, useState } from 'react';

const CreateAccountPage = () => {
  const [email, setEmail] = useState('');
  //   const [rights, setRights] = useState('');
  const rights = 'something';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/create-account`, { email, rights })
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to create account');
      });
  };
  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type='submit'>send invitation</button>
      </form>
    </div>
  );
};

export default CreateAccountPage;
