import React, { FormEvent, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import axios from 'axios';
import { BASE_URL } from '../../config';
import RightsCheckbox, { Right } from '../../forms/RightsCheckbox';
import { User } from '../../providers/AuthContext';
import Button from '../basic/Button';
import CloseIcon from '../../assets/close.svg?react';
import EditIcon from '../../assets/edit.svg?react';
import SaveIcon from '../../assets/check.svg?react';
import './AdminModal.scss';

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
  const [checkedRights, setCheckedRights] = useState<Right[]>(rights);
  const allRights: Right[] = ['vitals-details', 'chart', 'create-account'];

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setCheckedRights((prevRights) => {
      if (checked) {
        return [...prevRights, value as Right];
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
              rights={checkedRights}
              key={i}
              onCheckboxChange={handleCheckboxChange}
              disabled={!isEditMode}
            />
          ))}
          <div className='crud-buttons'>
            <Button
              id='special-button'
              type='button'
              onClick={() => {
                if (isEditMode) {
                  setCheckedRights(rights);
                }
                setIsEditMode((prev) => !prev);
              }}
              options={{ compact: true }}
            >
              {isEditMode ? (
                <CloseIcon className='icon enter' />
              ) : (
                <EditIcon className='icon enter' />
              )}
            </Button>
            <Button
              type='submit'
              variant='green'
              options={{ compact: true }}
              disabled={!isEditMode}
            >
              <SaveIcon />
            </Button>
          </div>
        </form>
      </div>
    </Accordion.Content>
  );
};

export default UserRightsAccordionContent;
