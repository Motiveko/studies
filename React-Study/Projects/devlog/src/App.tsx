import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './routes/Auth/Login';
import Register from './routes/Auth/Register';
import PublicRoute from './routes/PublicRoute';
import Auth from './routes/Auth/Auth';
import HomeLayout from './layout/HomeLayout';
import PrivateRoute from './routes/PrivateRoute';
import NotFound from './routes/NotFound';
import PostEditor from './routes/PostEditor';
import Dashboard from './routes/Dashboard';
import UserSettings from './routes/UserSettings';

function App() {
  // const { setError } = useCommon();
  // const ref = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   if (!ref.current) {
  //     throw new Error('라우터 구성에 문제가 발생하였습니다.');
  //   }
  //   console.log('아니 이런 씨빨');
  //   const globalErrorHandler = (e: ErrorEvent) => {
  //     console.log('쉬박새끼야');
  //     if (e.error?.name === 'MyError') {
  //       setError(e.error.message);
  //       alert(e.error.message);
  //     }
  //   };
  //   ref.current.addEventListener('error', globalErrorHandler);
  //   return () => ref.current?.removeEventListener('error', globalErrorHandler);
  // }, []);

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
