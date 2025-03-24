import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./layouts/default";
import HomePage from "./pages/home";
import AuthLayout from "./layouts/auth";
import Register from "./pages/register";
import Login from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route
          path='login'
          element={
            <AuthLayout title='Log in to your account' description='Enter your email and password below to log in'>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path='register'
          element={
            <AuthLayout title='Create an account' description='Enter your details below to create your account'>
              <Register />
            </AuthLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
