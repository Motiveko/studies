import React from 'react';

type Prop = {
  children: JSX.Element | JSX.Element[];
};

export default function HomeContentLayout({ children }: Prop) {
  return (
    <div className="d-flex align-items-center" style={{ height: '100vh' }}>
      {children}
    </div>
  );
}
