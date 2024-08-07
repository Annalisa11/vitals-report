import React, { ButtonHTMLAttributes } from 'react';
import './Button.scss';

type Options = {
  compact?: boolean;
};

type Props = {
  variant?: 'primary' | 'secondary' | 'green' | 'delete';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  options?: Options;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  variant = 'secondary',
  children,
  icon,
  iconPosition = 'left',
  options = {},
  ...props
}: Props) => {
  const { compact } = options;
  const buttonClass = `button ${variant} ${compact ? 'compact' : ''}`;

  return (
    <button className={buttonClass} {...props}>
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
