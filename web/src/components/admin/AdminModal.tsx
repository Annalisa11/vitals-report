import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './AdminModal.scss';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { FormEvent, useEffect, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import UserRightsAccordionContent from './UserRightsAccordionContent';
import UserRightsAccordionTrigger from './UserRightsAccordionTrigger';
import { useNavigate } from 'react-router-dom';
import AdminLogo from '../../assets/admin-person.svg?react';
import Button from '../basic/Button';
import useAuth from '../../hooks/useAuth';
import { User } from '../../providers/AuthContext';

const AdminModal = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [guesses, setGuesses] = useState<number>();
  const [inputValue, setInputValue] = useState<number | undefined>(0);
  const [isGuessEdit, setIsGuessEdit] = useState<boolean>(false);

  const getAdminInformation = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/admin`, { user });
      console.log(response);
      setUsers(response.data.users as User[]);
      setGuesses(response.data.guesses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAdminInformation();
  }, []);

  useEffect(() => {
    setInputValue(guesses); // Sync input value whenever guesses change
  }, [guesses]);
  const handleValueChange = (newValue: string) => {
    const newGuess = Number(newValue);
    setInputValue(newGuess === 0 ? undefined : newGuess);
    setIsGuessEdit(newGuess !== guesses); // Show warning if the new value is different
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      console.log('handle submit - post to guesses');
      await axios.post(`${BASE_URL}/admin/update-guesses`, {
        guesses: inputValue,
      });
      setGuesses(inputValue); // Update guesses to reflect the new saved value
      setIsGuessEdit(false); // Clear the warning after saving
    } catch (error) {
      console.error('Error updating guesses:', error);
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          variant='secondary'
          options={{ compact: true }}
          icon={<AdminLogo />}
        ></Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='DialogOverlay' />
        <Dialog.Content className='DialogContent'>
          <Dialog.Title className='DialogTitle'>
            <div className='DialogTitle__headline'>
              <AdminLogo className='logo' />
              <h2>Admin Panel</h2>
            </div>
          </Dialog.Title>
          <Dialog.Description className='dialog-description' />

          <div className='privacy-settings'>
            <h2>Manage Privacy Settings</h2>
            <small>Number of guesses logged out users have</small>
            <form onSubmit={handleSubmit}>
              <div>
                <small>{isGuessEdit && 'not saved'}</small>
                <input
                  style={{ width: 50 }}
                  type='number'
                  value={inputValue}
                  onChange={(e) => handleValueChange(e.target.value)}
                  min={1}
                />
              </div>

              <Button type='submit' variant='green'>
                Save
              </Button>
            </form>
            <h2>Manage Users and Rights</h2>
            <Button type='button' onClick={() => navigate('/create-account')}>
              Create new Account
            </Button>
            <Accordion.Root
              className='accordion-root'
              type='single'
              collapsible
            >
              {users &&
                users.map((user, i) => {
                  return (
                    <Accordion.Item
                      key={i}
                      className='accordion-item'
                      value={user.username}
                    >
                      <UserRightsAccordionTrigger
                        user={user}
                        getAdminInformation={getAdminInformation}
                      />
                      <UserRightsAccordionContent
                        user={user}
                        getAdminInformation={getAdminInformation}
                      />
                    </Accordion.Item>
                  );
                })}
            </Accordion.Root>
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          ></div>
          <Dialog.Close asChild>
            <Button className='IconButton' aria-label='Close'>
              <Cross2Icon height={20} width={20} />
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AdminModal;
