import React from 'react';
import CustomHR from '../../components/CustomHR';

type props = {
  children: JSX.Element | JSX.Element[];
};
function UserPostSummaryLayout({ children }: props) {
  return (
    <div className="d-flex flex-column w-100" style={{ maxHeight: '650px', marginBottom: '5rem' }}>
      {children}
      <CustomHR />
    </div>
  );
}

export default React.memo(UserPostSummaryLayout);
