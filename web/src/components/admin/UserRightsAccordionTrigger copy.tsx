import * as Accordion from '@radix-ui/react-accordion';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { User } from '../../providers/AuthContext';

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
        <div>
          {`${username}`}
          <button onClick={() => deleteUser()}>delete</button>
        </div>
      </Accordion.Trigger>
    </Accordion.Header>
  );
};

export default UserRightsAccordionTrigger;
