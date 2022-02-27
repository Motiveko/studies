import React from 'react';
import { Outlet } from 'react-router-dom';
import HomeContentLayout from './HomeContentLayout';
import Header from './Header';
import PostProvider from '../context/PostContext';

export default function HomeLayout() {
  return (
    <>
      <PostProvider>
        <HomeContentLayout>
          <Header />
          <Outlet />
        </HomeContentLayout>
      </PostProvider>
    </>
  );
}
