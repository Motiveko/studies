import React from 'react';

type Prop = {
  children: JSX.Element | JSX.Element[];
};

export default function HomeContentLayout({ children }: Prop) {
  return (
    <div className="row row-col-1">
      {/* <div className="col d-flex align-items-center justify-content-center overflow-scroll" style={{ height: '90vh' }}> */}
      <div className="col d-flex align-items-center justify-content-center overflow-scroll" style={{}}>
        {children}
      </div>
    </div>
  );
}
