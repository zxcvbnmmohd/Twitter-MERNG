import React, { useEffect, useState, useContext, createContext } from "react";
import { ApolloProvider } from "@apollo/client";
import { connect } from "react-redux";
import { Auth } from "./auth";
import { setUser, clearUser } from "../../redux/actions/auth";

const auth = new Auth();
const redirectKey = "sign_in_redirect";

export const AuthContext = createContext(undefined);

AuthContext.displayName = "AuthContext";

function setRedirect(redirect) {
  window.sessionStorage.setItem(redirectKey, redirect);
}

function getRedirect() {
  return window.sessionStorage.getItem(redirectKey);
}

function clearRedirect() {
  return window.sessionStorage.removeItem(redirectKey);
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return auth;
}

function AuthProvider(props) {
  const { user, setUser, clearUser, children } = props;
  // const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    auth.resolveUser(2000).onAuthStateChanged((user, error) => {
      console.log("auth state changed ", user);
      if (user) {
        setUser(user);
        setError(null);
      } else {
        clearUser();
        if (error) {
          setError(error);
        }
      }
      setInitializing(false);
    });
  }, []);

  const value = {
    user,
    error,
    auth,
    initializing,
    setRedirect,
    getRedirect,
    clearRedirect,
  };

  return (
    <AuthContext.Provider value={value}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </AuthContext.Provider>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user));
    },
    clearUser: () => {
      dispatch(clearUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);
