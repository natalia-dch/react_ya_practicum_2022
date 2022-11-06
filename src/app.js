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
// import { ProtectedRoute } from './components/protected-route';
// import { ProvideAuth } from './services/auth';

export default function App() {
  return (
    <>
    <AppHeader />
      <Router>
        <Switch>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </Route>
          <Route path="/profile" exact={true}>
            <ProfilePage />
          </Route>
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