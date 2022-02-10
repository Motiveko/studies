import React from 'react';

type Prop = {
  children: JSX.Element | JSX.Element[];
};

export default function HomeContentLayout({ children }: Prop) {
  return <div className="h-100 d-flex align-items-center justify-content-center">{children}</div>;
}
