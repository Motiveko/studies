import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './routes/Auth/Login';
import Register from './routes/Auth/Register';
import PublicRoute from './routes/routes/PublicRoute';
import Auth from './routes/Auth/Auth';
import HomeLayout from './layout/HomeLayout';
import PrivateRoute from './routes/routes/PrivateRoute';
import NotFound from './routes/NotFound';
import EditPost from './routes/EditPost/EditPost';
import Dashboard from './routes/Dashboard/Dashboard';
import UserSettings from './routes/UserSettings';
import GlobalLoading from './components/GlobalLoading';
import Post from './routes/Post/Post';
import UserPage from './routes/User/UserPage';

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
            <Route path="/post/:id" element={<Post />} />
            <Route path="user" element={<PrivateRoute />}>
              <Route path="post" element={<EditPost />} />
              <Route path="post/:id" element={<EditPost />} />
              <Route path="settings" element={<UserSettings />} />
              <Route path=":id" element={<UserPage />} />
              <Route
                path="tempPost"
                element={<div>TODO : 임시 글 목록 구현할 것</div>}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <GlobalLoading />
    </>
  );
}

export default App;
