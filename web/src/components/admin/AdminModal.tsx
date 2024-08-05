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

const AdminModal = () => {
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
        <button className=''>Open Admin panel</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='DialogOverlay' />
        <Dialog.Content className='DialogContent'>
          <Dialog.Title className='DialogTitle'>Admin Panel</Dialog.Title>
          <div>
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
          >
            <Dialog.Close asChild>
              <button className='Button green'>Save changes</button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className='IconButton' aria-label='Close'>
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AdminModal;
