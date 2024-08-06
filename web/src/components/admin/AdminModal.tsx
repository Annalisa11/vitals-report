import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './AdminModal.scss';
import axios from 'axios';
import { useAuth, User } from '../../providers/AuthContext';
import { BASE_URL } from '../../config';
import { useEffect, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import UserRightsAccordionContent from './UserRightsAccordionContent';
import UserRightsAccordionTrigger from './UserRightsAccordionTrigger copy';
import { useNavigate } from 'react-router-dom';
import AdminLogo from '../../assets/admin-person.svg?react';
import Button from '../basic/Button';

const AdminModal = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  const getAdminInformation = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/admin`, { user });
      console.log(response);
      setUsers(response.data as User[]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAdminInformation();
  }, []);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant='secondary' icon={<AdminLogo />}></Button>
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
          <div>
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
