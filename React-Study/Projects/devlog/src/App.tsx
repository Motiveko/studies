import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './routes/Login';
import Register from './routes/Register';
import PublicRoute from './routes/PublicRoute';
import Auth from './routes/Auth';
import HomeLayout from './layout/HomeLayout';
import PrivateRoute from './routes/PrivateRoute';
import NotFound from './routes/NotFound';
import PostEditor from './routes/PostEditor';
import Dashboard from './routes/Dashboard';
import UserSettings from './routes/UserSettings';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/*" element={<PublicRoute />}>
            <Route path="" element={<Auth />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Route>
          <Route path="/" element={<HomeLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/post/:id" element={<div>포스트상세</div>} />
            <Route path="user" element={<PrivateRoute />}>
              <Route path="newPosts" element={<PostEditor />} />
              <Route path="settings" element={<UserSettings />} />
              <Route path="tempPost" element={<div>TODO : 임시 글 목록 구현할 것</div>} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
