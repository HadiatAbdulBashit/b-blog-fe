import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./layouts/default";
import HomePage from "./pages/home";
import AuthLayout from "./layouts/auth";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ArticlePage from "./pages/article";
import CreateArticle from "./pages/article/create";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path='articles/new' element={<CreateArticle />} />
          <Route path='articles/:id' element={<ArticlePage />} />
        </Route>

        <Route
          path='login'
          element={
            <AuthLayout title='Log in to your account' description='Enter your email and password below to log in'>
              <LoginPage />
            </AuthLayout>
          }
        />
        <Route
          path='register'
          element={
            <AuthLayout title='Create an account' description='Enter your details below to create your account'>
              <RegisterPage />
            </AuthLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
