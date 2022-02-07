import React from 'react';
import { Link } from 'react-router-dom';

type Prop = {
  to: string;
  children: JSX.Element | JSX.Element[] | string;
  variant: Variant;
};

type Variant = 'dark' | 'outline-dark';

function LinkButton({ to, children, variant }: Prop) {
  const style = {
    borderRadius: '30px',
    color: variant === 'dark' ? 'white' : 'dark',
  };

  const className = ['btn', `btn-${variant}`];
  return (
    <>
      <Link to={to} className={className.join(' ')} style={style}>
        {children}
      </Link>
    </>
  );
}

export default React.memo(LinkButton);
