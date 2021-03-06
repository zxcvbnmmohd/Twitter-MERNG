import gql from "graphql-tag";

export const LOGIN_USER = gql`
    mutation Login($username: String!, $password: String!) {
      login(loginInput: { username: $username, password: $password }) {
      id
      selfie
      name
      username
      dob
      email
      token
      updatedAt
      createdAt
    }
  }
`;

export const REGISTER_USER = gql`
    mutation Register($name: String!, $username: String!, $dob: Date!, $email: String!, $password: String!) {
      register(registerInput: { name: $name, username: $username, dob: $dob, email: $email, password: $password }) {
      id
      selfie
      name
      username
      dob
      email
      token
      updatedAt
      createdAt
    }
  }
`;