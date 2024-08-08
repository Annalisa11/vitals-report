import axios from 'axios';
import { BASE_URL } from '../config';
import { FormEvent, useState } from 'react';
import RightsCheckbox, { Right } from '../forms/RightsCheckbox';
import Button from '../components/basic/Button';
import useAuth from '../hooks/useAuth';

const CreateAccountPage = () => {
  const [email, setEmail] = useState('');
  const [rights, setRights] = useState<string[]>([]);
  const { user } = useAuth();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setRights((prevRights) => {
      if (checked) {
        return [...prevRights, value];
      } else {
        return prevRights.filter((right) => right !== value);
      }
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/create-account`, { email, rights, user })
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to create account');
      });
  };

  const rightsData: { name: string; right: Right }[] = [
    {
      name: 'Chart',
      right: 'chart',
    },
    {
      name: 'Vitals Details',
      right: 'vitals-details',
    },
    {
      name: 'Create Account',
      right: 'create-account',
    },
  ];

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
        <h2>to what information should the user have access?</h2>
        {rightsData.map(({ right, name }) => (
          <RightsCheckbox
            name={name}
            right={right}
            rights={rights}
            onChange={handleCheckboxChange}
          />
        ))}
        <Button type='submit'>Send Invitation</Button>
      </form>
    </div>
  );
};

export default CreateAccountPage;
