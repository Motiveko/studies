import { Container } from "react-bootstrap";
import Signup from "./authentication/Signup";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Profile from "./authentication/Profile";
import Login from "./authentication/Login";
import PrivateRoute from "./authentication/PrivateRoute";
import ForgotPassword from "./authentication/ForgotPassword";
import UpdateProfile from "./authentication/UpdateProfile";
import Dashboard from "./google-drive/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Drive */}

          {/* Profile */}
          {/* <PrivateRoute exact path="/" element={<Dashboard />} /> */}
          <Route path="/" element={<PrivateRoute />} >
            <Route exact path="/" element={<Dashboard />}/>
            <Route exact path="/user" element={<Profile />}/>
            <Route exact path="/update-profile" element={<UpdateProfile />}/>
          </Route>

          {/* Auth */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
