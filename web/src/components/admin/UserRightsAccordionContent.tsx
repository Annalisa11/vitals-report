import React, { FormEvent, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import axios from 'axios';
import { BASE_URL } from '../../config';
import RightsCheckbox, { Right } from '../../forms/RightsCheckbox';
import { User } from '../../providers/AuthContext';

interface Props {
  user: User;
  getAdminInformation: () => Promise<void>;
}

const UserRightsAccordionContent = ({
  user,
  getAdminInformation,
  ...props
}: Props) => {
  const { username, rights } = user;
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [checkedRights, setCheckedRights] = useState<string[]>(rights);
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

  const handleSaveRights = async (e: FormEvent) => {
    e.preventDefault();
    axios
      .put(`${BASE_URL}/admin/rights/${username}`, { rights: checkedRights })
      .then(() => {
        getAdminInformation();
        setIsEditMode(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Accordion.Content className='accordion-content' {...props}>
      <div>
        <form onSubmit={handleSaveRights}>
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
            disabled={isEditMode}
          >
            Edit
          </button>

          <button
            type='button'
            className='button green'
            onClick={() => {
              setIsEditMode(false);
              setCheckedRights(rights);
            }}
          >
            Cancel
          </button>
          <button type='submit' className='button green' disabled={!isEditMode}>
            Save
          </button>
        </form>
      </div>
    </Accordion.Content>
  );
};

export default UserRightsAccordionContent;
