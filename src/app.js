import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ForgotPasswordPage,
  HomePage,
  IngredientPage,
  LoginPage,
  NotFound404Page,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage } from './pages';

  import AppHeader from "./components/app-header/AppHeader";
import { ProtectedRoute } from './utils/ProtectedRoute';
// import { ProtectedRoute } from './components/protected-route';
// import { ProvideAuth } from './services/auth';

export default function App() {
  return (
    <>
    <Router>
    <AppHeader />
        <Switch>
          <ProtectedRoute fromAuthorized path="/login" exact={true}>
            <LoginPage />
          </ProtectedRoute>
          <ProtectedRoute fromAuthorized path="/register" exact={true}>
            <RegisterPage />
          </ProtectedRoute>
          <ProtectedRoute fromAuthorized path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </ProtectedRoute>
          <ProtectedRoute fromAuthorized path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </ProtectedRoute>
          <ProtectedRoute fromUnauthorized path="/profile" exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <Route path="/ingredient/:id" exact={true}>
            <IngredientPage />
          </Route>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route>
            <NotFound404Page />
          </Route>
        </Switch>
      </Router>
      </>
  );
}