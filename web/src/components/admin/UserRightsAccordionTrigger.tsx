import * as Accordion from '@radix-ui/react-accordion';
import { User } from '@providers/AuthContext';
import './UserAccordion.scss';
import { ChevronDownIcon } from '@radix-ui/react-icons';

interface Props {
  user: User;
}

const UserRightsAccordionTrigger = ({ user, ...props }: Props) => {
  const { username } = user;

  return (
    <Accordion.Header className='accordion-header' {...props}>
      <Accordion.Trigger className='accordion-trigger'>
        {username}
        <ChevronDownIcon className='AccordionChevron' aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  );
};

export default UserRightsAccordionTrigger;
