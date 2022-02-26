import React, { MouseEventHandler, useMemo } from 'react';
import { Button, Image } from 'react-bootstrap';

type props = {
  children: string | JSX.Element | JSX.Element[] | undefined;
  size?: {
    width: string;
    height: string;
  };
  onClick?: MouseEventHandler | undefined;
};
function GoogleButton({ children, size, onClick }: props) {
  const buttonSize = useMemo(() => {
    if (size) return size;
    return { width: '1.25rem', height: '1.25rem' };
  }, [size]);
  return (
    <Button variant="light" className="w-100 mt-2" onClick={onClick}>
      <Image src="/assets/google.png" style={{ ...buttonSize }} className="me-2 p-0" /> {children}
    </Button>
  );
}

export default React.memo(GoogleButton);
