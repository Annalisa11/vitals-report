import '../styles/forms/RightsCheckbox.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  right: Right;
  rights: Right[];
  onCheckboxChange: (value: string, checked: boolean) => void;
}

export type Right = 'chart' | 'vitals-details' | 'create-account';

const RightsCheckbox = ({
  name,
  right,
  onCheckboxChange,
  rights,
  disabled = false,
  ...rest
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    onCheckboxChange(value, checked);
  };

  return (
    <div className='checkbox'>
      <input
        id={`${right}`}
        type='checkbox'
        value={right}
        checked={rights.includes(right)}
        onChange={handleChange}
        disabled={disabled}
        {...rest}
      />
      <label htmlFor={`${right}`}>{name}</label>
    </div>
  );
};

export default RightsCheckbox;
