import React from 'react';

type Prop = {
  children: JSX.Element | JSX.Element[];
};

export default function HomeContentLayout({ children }: Prop) {
  return (
    <div style={{ height: '100vh' }} className="d-flex flex-column">
      {children}
    </div>
  );
}
