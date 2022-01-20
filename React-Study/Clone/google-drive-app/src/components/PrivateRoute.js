import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function PrivateRoute({element: Component, ...rest }) {
  const { currentUser } =useAuth();

  /** 
   * react-router-dom v6부터 바뀌는 내용으로 인해 PrivateRouter 구현 방법이 많이 달라졌다.
   * https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou
   * 를 참고해서 구현한다.
   */

  // return (
  //   <Route
  //     {...rest}
  //     element={props => {
  //       return currentUser ? <Component {...props} /> : <Navigate to="/login" />
  //     }}
  //   ></Route>  
  // )

  return currentUser ? <Outlet /> : <Navigate to="/login"/>;
}