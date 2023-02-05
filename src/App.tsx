
import './App.scss';
import React, {useEffect} from "react";
import {PostList} from "./components/PostList";
import {Link, NavLink, Route, Routes, useNavigate} from "react-router-dom";
import {Post} from "./components/Post";
import {PostProvider} from "./contexts/PostContext";
import {RegistrationPage} from "./components/RegistrationPage";
import {usePageError} from "./hooks/usePageError";
import {useAuth} from "./contexts/AuthContext";
import {Loader} from "./components/Loader";
import {AccountActivationPage} from "./components/AccountActivationPage";
import {LoginPage} from "./components/LoginPage";
import {RequireAuth} from "./components/RequireAuth";
import {HomePage} from "./components/HomePage";

export const App: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = usePageError('');
  const { isChecked, user, logout, checkAuth} = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isChecked) {
    return <Loader />
  }

  return <>
    <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
      <div className="navbar-start">
        <NavLink to="/" className="navbar-item">
          Home
        </NavLink>

        <NavLink to="/posts" className="navbar-item">
          Posts
        </NavLink>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {user ? (
              <button
                className="button is-light has-text-weight-bold"
                onClick={() => {
                  logout()
                    .then(() => {
                      navigate('/');
                    })
                    .catch((error) => {
                      setError(error.response?.data?.message);
                    });
                }}
              >
                Log out
              </button>
            ) : (
              <>
                <Link to="/sign-up" className="button is-link has-text-weight-bold">
                  Sign up
                </Link>

                <Link to="/login" className="button is-link has-text-weight-bold">
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>

    <main>
      <section className="section">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="sign-up"
            element={<RegistrationPage />}
          />
          <Route
            path="activate/:activationToken"
            element={<AccountActivationPage />}
          />
          <Route
            path="login"
            element={<LoginPage />}
          />

          <Route path="/posts" element={<RequireAuth />}>
            <Route
              index
              element={<PostList />}
            />
            <Route path="/posts/:id" element={<PostProvider>
              <Post />
            </PostProvider>} />
          </Route>
        </Routes>
      </section>

      {error && <p className="notification is-danger is-light">{error}</p>}
    </main>
  </>
}
