import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

type Prop = {
  children: string;
  variant: string;
  className?: string;
  size?: 'sm' | 'lg';
};
function BackButton({ children, variant, className, size }: Prop) {
  const navigate = useNavigate();
  const goBack = useCallback(() => navigate(-1), [navigate]);
  return (
    <Button variant={variant} size={size} className={className} onClick={goBack}>
      {children}
    </Button>
  );
}

export default React.memo(BackButton);
