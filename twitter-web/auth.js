import React, { useState, useContext, createContext } from "react";
import Router from "next/router";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { LOGIN_USER, REGISTER_USER } from "./apis";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null);

  const isLoggedIn = () => {
    if (authToken) {
      return true;
    } else {
      return false;
    }
  };

  const getAuthHeaders = () => {
    if (!authToken) return null;

    return {
      authorization: `TwitterToken ${authToken}`,
    };
  };

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: "http://localhost:5050/",
      headers: getAuthHeaders(),
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };

  const register = async ({ name, username, dob, email, password }) => {
    const client = createApolloClient();
    const result = await client.mutate({
      mutation: REGISTER_USER,
      variables: { name, username, dob, email, password },
    });

    if (result?.data?.register?.token) {
      setAuthToken(result.data.register.token);
      return authToken;
    }
  };

  const login = async ({ username, password }) => {
    const client = createApolloClient();
    const result = await client.mutate({
      mutation: LOGIN_USER,
      variables: { username, password },
    });

    if (result?.data?.login?.token) {
      setAuthToken(result.data.login.token);
      
      Router.push("/home");
      
      return authToken;
    }
    
  };

  const logout = () => {
    setAuthToken(null);
  };

  return {
    authToken,
    setAuthToken,
    isLoggedIn,
    register,
    login,
    logout,
    createApolloClient,
  };
}
