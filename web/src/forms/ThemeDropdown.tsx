import { useContext, useState } from 'react';
import { Theme, ThemeContext } from '../providers/ThemeContext';

const ThemeDropdown = () => {
  const [selectedValue, setSelectedValue] = useState<Theme>('classic');
  const { changeTheme } = useContext(ThemeContext);

  const handleChangeValue = (newValue: Theme) => {
    console.log('handle value change of dropdown', newValue);
    setSelectedValue(newValue);
    changeTheme(newValue);
  };

  return (
    <div>
      <label htmlFor='cars'>Choose a theme:</label>

      <select
        value={selectedValue}
        onChange={(e) => handleChangeValue(e.target.value as Theme)}
      >
        <option value='classic'>classic</option>
        <option value='dark'>dark</option>
        <option value='unicorn'>unicorn</option>
      </select>
    </div>
  );
};

export default ThemeDropdown;
