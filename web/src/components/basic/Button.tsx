import React, { ButtonHTMLAttributes } from 'react';
import './Button.scss';

type Props = {
  variant?: 'primary' | 'secondary' | 'green' | 'delete';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  variant = 'secondary',
  children,
  icon,
  iconPosition = 'left',
  ...props
}: Props) => {
  return (
    <button className={`button ${variant}`} {...props}>
      <div className='button__content'>
        {icon && iconPosition === 'left' && (
          <span className='icon left'>{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className='icon right'>{icon}</span>
        )}
      </div>
    </button>
  );
};

export default Button;
