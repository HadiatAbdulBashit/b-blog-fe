import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./layouts/default";
import HomePage from "./pages/home";
import AuthLayout from "./layouts/auth";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ArticlePage from "./pages/article";
import CreateArticlePage from "./pages/article/create";
import MyArticlePage from "./pages/article/my";
import EditArticlePage from "./pages/article/edit";
import ProtectedRoute from "./components/protected-route";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path='articles/:id' element={<ArticlePage />} />
        </Route>
        <Route path='/' element={<ProtectedRoute condition={isAuthenticated} target='/' />}>
          <Route path='/' element={<DefaultLayout />}>
            <Route path='articles/:id/edit' element={<EditArticlePage />} />
            <Route path='articles/new' element={<CreateArticlePage />} />
            <Route path='articles/my' element={<MyArticlePage />} />
          </Route>
        </Route>

        <Route path='/' element={<ProtectedRoute condition={!isAuthenticated} target='/' />}>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
