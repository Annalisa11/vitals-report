interface Props {
  name: string;
  right: Right;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rights: string[];
}

export type Right = 'chart' | 'vitals-details' | 'create-account';

const RightsCheckbox = ({ name, right, rights, onChange }: Props) => {
  return (
    <div className='checkbox'>
      <label>
        <input
          type='checkbox'
          value={right}
          checked={rights.includes(right)}
          onChange={onChange}
        />
        {name}
      </label>
    </div>
  );
};

export default RightsCheckbox;
