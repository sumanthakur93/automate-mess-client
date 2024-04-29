import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import useRefresh from "./hooks/useRefresh";
import useAuth from "./states/useAuth";
import MessBill from "./pages/MessBill";
import Rebate from "./pages/Rebate";
import AdminRebate from "./pages/admin/Rebate";
// import AdminMessBill from "./pages/admin/MessBill";
import Profile from "./pages/Profile";
import AdminProfile from "./pages/admin/Profile"
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";

export default function App() {
  useRefresh();
  const isAuth = useAuth((state) => state.isAuth);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/messBill"
          element={isAuth ? <MessBill /> : <Navigate to="/?redirect_to=messBill" />}
        />
        <Route
          path="/admin/messBill"
          element={isAuth ? <AdminMessBill /> : <Navigate to="/?redirect_to=admin/messBill" />}
        />
        <Route
          path="/rebate"
          element={isAuth ? <Rebate /> : <Navigate to="/?redirect_to=rebate" />}
        />
        <Route
          path="/admin/rebate"
          element={isAuth ? <AdminRebate /> : <Navigate to="/?redirect_to=admin/rebate" />}
        />
        <Route
          path="/profile"
          element={isAuth ? <Profile /> : <Navigate to="/?redirect_to=profile" />}
        />
        {/* <Route
          path="/admin/profile"
          element={isAuth ? <AdminProfile /> : <Navigate to="/?redirect_to=admin/profile" />}
        /> */}
        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isAuth ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/admin-register"
          element={!isAuth ? <AdminRegister /> : <Navigate to="/" />}
        />
        <Route
          path="/admin-login"
          element={!isAuth ? <AdminLogin /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}
