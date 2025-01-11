import axios from 'axios';
import { BASE_URL } from '@/config';
import { FormEvent, useState } from 'react';
import RightsCheckbox, { Right } from '@forms/RightsCheckbox';
import Button from '@components/basic/Button';
import useAuth from '@hooks/useAuth';
import '@styles/pages/CreateAccount.scss';

const CreateAccountPage = () => {
  const defaultRights: Right[] = ['chart', 'vitals-details'];

  const [email, setEmail] = useState('');
  const [rights, setRights] = useState<Right[]>(defaultRights);
  const { user } = useAuth();

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setRights((prevRights) => {
      if (checked) {
        return [...prevRights, value as Right];
      } else {
        return prevRights.filter((right) => right !== value);
      }
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/create-account`, { email, rights, adminUser: user })
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to create account');
      });
  };

  const rightsDataVisual: { name: string; right: Right }[] = [
    {
      name: 'Chart',
      right: 'chart',
    },
    {
      name: 'Vitals Details',
      right: 'vitals-details',
    },
  ];
  const rightsDataAdministrative: { name: string; right: Right }[] = [
    {
      name: 'Create Account',
      right: 'create-account',
    },
  ];

  return (
    <div className='create-account'>
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
        <section className='create-account__rights'>
          <h2>What rights should the user have?</h2>
          <div className='create-account__rights-container'>
            <fieldset>
              <h3>What should the user see?</h3>
              {rightsDataVisual.map(({ right, name }) => (
                <RightsCheckbox
                  name={name}
                  right={right}
                  rights={rights}
                  onCheckboxChange={handleCheckboxChange}
                />
              ))}
            </fieldset>
            <fieldset>
              <h3>What should the user be able to do?</h3>
              {rightsDataAdministrative.map(({ right, name }) => (
                <RightsCheckbox
                  name={name}
                  right={right}
                  rights={rights}
                  onCheckboxChange={handleCheckboxChange}
                />
              ))}
            </fieldset>
          </div>
        </section>

        <Button type='submit'>Send Invitation</Button>
      </form>
    </div>
  );
};

export default CreateAccountPage;
