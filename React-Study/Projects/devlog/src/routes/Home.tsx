import React from 'react';
import { Outlet } from 'react-router-dom';
import HomeContentLayout from '../layout/HomeContentLayout';
import Header from '../layout/Header';

// type Prop = {
//   children: JSX.Element | JSX.Element[];
// };
export default function Home() {
  return (
    <>
      <Header />
      <HomeContentLayout>
        <Outlet />
      </HomeContentLayout>
    </>
  );
}
