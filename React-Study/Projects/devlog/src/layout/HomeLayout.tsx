import React from 'react';
import { Outlet } from 'react-router-dom';
import HomeContentLayout from './HomeContentLayout';
import Header from './Header';

// type Prop = {
//   children: JSX.Element | JSX.Element[];
// };
export default function HomeLayout() {
  return (
    <>
      <HomeContentLayout>
        <Header />
        <Outlet />
      </HomeContentLayout>
    </>
  );
}
