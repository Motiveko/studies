import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PublicRoute from './routes/PublicRoute';
import Auth from './routes/Auth';
import Home from './routes/Home';
import PrivateRoute from './routes/PrivateRoute';
import NotFound from './routes/NotFound';
import PostEditor from './components/PostEditor';

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
          <Route path="/" element={<Home />}>
            <Route path="user" element={<PrivateRoute />}>
              <Route path="newPosts" element={<PostEditor />} />
              <Route path="settings" element={<div>회원정보</div>} />
              <Route path="tempPost" element={<div>임시 포스트</div>} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
