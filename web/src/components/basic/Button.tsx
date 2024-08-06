import React, { ButtonHTMLAttributes } from 'react';
import './Button.scss';

type Props = {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ variant = 'secondary', children, ...props }: Props) => {
  return (
    <button className={`button ${variant}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
