import React from 'react';



/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<Props> = ({
  children,
  onClick
}) => {
  return (
    <button onClick={onClick} access-id="button">
      {children}
    </button>
  );
};

export interface Props {
    /**
     * The children are displayed inside the button
     */
    children: React.ReactElement;
    /**
     * Optional click handler
     */
    onClick?: () => void;
  }