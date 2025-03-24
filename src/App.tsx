import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./layouts/default";
import HomePage from "./pages/home";
import AuthLayout from "./layouts/auth";
import Register from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
        </Route>
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
