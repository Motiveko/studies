import React from 'react';

type props = {
  children: React.ReactNode;
};

export default function HomeContentLayout({ children }: props) {
  return (
    <div style={{ height: '100vh' }} className="d-flex flex-column">
      {children}
    </div>
  );
}
