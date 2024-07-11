// Accordion.jsx
import React from 'react';
import '../styles/Accordion.scss';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
}

const Accordion = ({ isOpen, children }: Props) => {
  return <div className={`visible ${isOpen ? 'open' : ''}`}>{children}</div>;
};

export default Accordion;
