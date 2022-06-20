import React from 'react';
import ReactDOM from 'react-dom';
import { usePortal } from '../../hooks/usePortal';

type Modal = {
  children: React.ReactNode;
};

const Modal = ({ children }: Modal) => {
  const target = usePortal('modal');
  return ReactDOM.createPortal(children, target);
};

export default Modal;
