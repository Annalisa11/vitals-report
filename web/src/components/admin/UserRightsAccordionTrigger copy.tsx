import * as Accordion from '@radix-ui/react-accordion';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { User } from '../../providers/AuthContext';
import Button from '../basic/Button';
import TrashIcon from '../../assets/trash.svg?react';
import './UserAccordion.scss';

interface Props {
  user: User;
  getAdminInformation: () => Promise<void>;
}

const UserRightsAccordionTrigger = ({
  user,
  getAdminInformation,
  ...props
}: Props) => {
  const { username } = user;
  const deleteUser = async () => {
    axios
      .delete(`${BASE_URL}/admin/${username}`)
      .then(() => {
        getAdminInformation();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Accordion.Header className='accordion-header' {...props}>
      <Accordion.Trigger className='accordion-trigger'>
        {username}
        <Button variant='delete' onClick={() => deleteUser()}>
          <TrashIcon />
        </Button>
      </Accordion.Trigger>
    </Accordion.Header>
  );
};

export default UserRightsAccordionTrigger;
