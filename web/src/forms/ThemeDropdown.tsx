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
      <label htmlFor='themes'>Choose a theme:</label>

      <select
        // style={{
        //   border: '1px solid red',
        //   backgroundColor: 'pink',
        //   borderRadius: 30,
        // }}
        className='hallo'
        value={selectedValue}
        onChange={(e) => handleChangeValue(e.target.value as Theme)}
      >
        <option style={{ border: '1px solid blue' }} value='classic'>
          classic
        </option>
        <option value='dark'>dark</option>
        <option value='unicorn'>unicorn</option>
      </select>
    </div>
  );
};

export default ThemeDropdown;
