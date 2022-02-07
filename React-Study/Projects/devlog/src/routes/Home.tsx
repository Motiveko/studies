import React from 'react';
import { Outlet } from 'react-router-dom';
import HomeContentLayout from '../context/HomeContentLayout';
import Header from '../layout/Header';

// type Prop = {
//   children: JSX.Element | JSX.Element[];
// };
export default function Home() {
  console.log('Home');
  return (
    <>
      <Header />
      <HomeContentLayout>
        <Outlet />
      </HomeContentLayout>
    </>
  );
}
