import React from 'react';
import * as Switch from '@radix-ui/react-switch';

import '../styles/ToggleSwitch.scss';
interface Props {
  toggleSwitch: React.Dispatch<React.SetStateAction<boolean>>;
  checked: boolean;
}
const ToggleSwitch = ({ toggleSwitch, checked }: Props) => {
  const handleToggle = () => {
    toggleSwitch(!checked);
  };
  return (
    <form>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <label
          className='label left'
          htmlFor='airplane-mode'
          style={{ paddingRight: 15 }}
        >
          Less
        </label>
        <Switch.Root
          className='SwitchRoot'
          id='airplane-mode'
          onCheckedChange={handleToggle}
        >
          <Switch.Thumb className='SwitchThumb' />
        </Switch.Root>
        <label
          className='label right'
          htmlFor='airplane-mode'
          style={{ paddingLeft: 15 }}
        >
          More
        </label>
      </div>
    </form>
  );
};

export default ToggleSwitch;
