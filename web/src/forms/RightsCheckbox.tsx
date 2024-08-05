import '../styles/forms/RightsCheckbox.scss';

interface Props {
  name: string;
  right: Right;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rights: string[];
  disabled?: boolean;
}

export type Right = 'chart' | 'vitals-details' | 'create-account';

const RightsCheckbox = ({
  name,
  right,
  rights,
  onChange,
  disabled = false,
}: Props) => {
  return (
    <div className='checkbox'>
      <input
        id={`${right}`}
        type='checkbox'
        value={right}
        checked={rights.includes(right)}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={`${right}`}>{name}</label>
    </div>
  );
};

export default RightsCheckbox;
