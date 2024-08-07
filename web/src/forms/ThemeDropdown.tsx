import { useContext, useState } from 'react';
import { Theme, ThemeContext } from '../providers/ThemeContext';
import '../styles/forms/ThemeDropdown.scss';

const ThemeDropdown = () => {
  const { changeTheme, theme } = useContext(ThemeContext);
  const [selectedValue, setSelectedValue] = useState<Theme>(theme ?? 'classic');

  const handleChangeValue = (newValue: Theme) => {
    setSelectedValue(newValue);
    changeTheme(newValue);
  };

  return (
    <div className='theme-dropdown'>
      <div className='custom-select-wrapper'>
        <select
          id='themes'
          className='custom-select'
          value={selectedValue}
          onChange={(e) => handleChangeValue(e.target.value as Theme)}
        >
          <option value='classic'>classic</option>
          <option value='dark'>dark</option>
          <option value='unicorn'>unicorn</option>
        </select>
      </div>
    </div>
  );
};

export default ThemeDropdown;
