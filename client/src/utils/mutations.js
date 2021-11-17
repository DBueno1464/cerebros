import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
          _id
          username
      }
      }
    }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_MOVIE = gql`
  mutation saveMovie($input: savedMovie!) {
    saveMovie(input: $input) {
      username
      email
      movieCount
      savedMovies {
        _id
        movieId
        image
        title
        description
      }
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation removeMovie($movieId: String!) {
    removeMovie(movieId: $movieId) {
      username
      email
      movieCount
      savedMovies {
        _id
        movieId
        image
        title
        description
      }
    }
  }
`;
