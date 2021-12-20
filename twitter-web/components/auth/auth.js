import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import jwtDecode from "jwt-decode";
import { LOGIN_USER, REGISTER_USER } from "../../apis/";

export class Auth {
  constructor() {
    this.user = null;
    this.authToken = null;
    this.errors = null;
  }

  onAuthStateChanged(cb) {
    this.cb = cb;
    return () => {
      this.cb = null;
    };
  }

  onUserChange(user, authToken, errors) {
    this.cb && this.cb(user, authToken, errors);
  }

  getAuthHeaders() {
    if (!this.authToken) return null;

    return {
      authorization: `TwitterToken ${this.authToken}`,
    };
  }

  createApolloClient() {
    const link = new HttpLink({
      uri: "http://localhost:5050/",
      headers: this.getAuthHeaders(),
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  }

  decodeToken(token) {
    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
      } else {
        return decodedToken;
      }
    }
  }

  async login({ username, password }) {
    const client = this.createApolloClient();
    const result = await client.mutate({
      mutation: LOGIN_USER,
      variables: { username, password },
    });

    if (result?.data?.login?.token) {
      this.authToken = result.data.login.token;
      this.user = this.decodeToken(result.data.login.token);
      window.sessionStorage.setItem("user", JSON.stringify(this.user));
      this.onUserChange(this.user, this.authToken);
    } else {
      this.errors = { message: "Wrong email or password" };
      this.onUserChange(null, this.errors);
    }
  }

  async register({ name, username, dob, email, password }) {
    const client = this.createApolloClient();
    const result = await client.mutate({
      mutation: REGISTER_USER,
      variables: { name, username, dob, email, password },
    });

    if (result?.data?.register?.token) {
      this.authToken = result.data.register.token;
      this.user = this.decodeToken(result.data.register.token);
      window.sessionStorage.setItem("user", JSON.stringify(this.user));
      this.onUserChange(this.user, this.authToken);
    } else {
      this.errors = { message: "Wrong email or password" };
      this.onUserChange(null, this.errors);
    }
  }

  logout() {
    window.sessionStorage.removeItem("user");
    this.authToken = null;
    this.user = null;
    this.onUserChange(this.user, this.authToken);
  }

  resolveUser(timeout) {
    setTimeout(() => {
      if (window) {
        const signedInUser = window.sessionStorage.getItem("user");
        if (signedInUser) {
          this.user = JSON.parse(signedInUser);
        }
      } else {
        this.authToken = null;
        this.user = null;
      }
      this.onUserChange(this.user, this.authToken);
    }, timeout);
    return this;
  }
}
