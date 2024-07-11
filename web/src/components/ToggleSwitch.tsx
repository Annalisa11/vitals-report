import React from 'react';
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
    <div className='kitty-switch'>
      <input
        type='checkbox'
        id='toggle'
        checked={checked}
        onChange={handleToggle}
      />
      <div className='kitty'></div>
      <label htmlFor='toggle' className='well'></label>
    </div>
  );
};

export default ToggleSwitch;
