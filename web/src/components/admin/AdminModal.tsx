import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './AdminModal.scss';
import axios from 'axios';
import { useAuth, User } from '../../providers/AuthContext';
import { BASE_URL } from '../../config';
import { useEffect, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import RightsCheckbox, { Right } from '../../forms/RightsCheckbox';

const AdminModal = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleSaveRights = async (rights: Right[], username: string) => {
    axios
      .put(`${BASE_URL}/admin/rights/${username}`, { rights })
      .then(() => {
        getAdminInformation();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAdminInformation = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/admin`, { user });
      console.log(response);
      setUsers(response.data as User[]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (username: string) => {
    axios
      .delete(`${BASE_URL}/admin/${username}`)
      .then(() => {
        getAdminInformation();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAdminInformation();
    console.info(checkedRights);
  }, []);

  const [checkedRights, setCheckedRights] = useState<string[]>([]);
  const allRights: Right[] = ['vitals-details', 'chart', 'create-account'];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setCheckedRights((prevRights) => {
      if (checked) {
        return [...prevRights, value];
      } else {
        return prevRights.filter((r) => r !== value);
      }
    });
  };

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
            {users &&
              users.map(({ username, rights }, i) => {
                return (
                  <Accordion.Root
                    className='accordion-root'
                    type='single'
                    collapsible
                  >
                    <Accordion.Item className='accordion-item' value={username}>
                      <Accordion.Header className='accordion-header'>
                        <Accordion.Trigger className='accordion-trigger'>
                          <div key={i}>
                            {`${username}`}
                            <button onClick={() => deleteUser(username)}>
                              delete
                            </button>
                          </div>
                        </Accordion.Trigger>
                      </Accordion.Header>
                      <Accordion.Content className='accordion-content'>
                        <div>
                          <form>
                            {allRights.map((right, i) => (
                              <RightsCheckbox
                                name={right}
                                right={right}
                                key={i}
                                onChange={handleCheckboxChange}
                                rights={checkedRights}
                                disabled={!isEditMode}
                              />
                            ))}
                            <button
                              type='button'
                              className='button green'
                              onClick={() => setIsEditMode((prev) => !prev)}
                            >
                              Edit
                            </button>
                            <button
                              type='submit'
                              className='button green'
                              disabled={!isEditMode}
                            >
                              Save
                            </button>
                          </form>
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  </Accordion.Root>
                );
              })}
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
