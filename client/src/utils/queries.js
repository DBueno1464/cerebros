import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      movieCount
      savedMovies {
        movieId
        image
        title
        description
      }
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;

// export const QUERY_ME = gql`
//   query me {
//     me {
//       _id
//       username
//       email
//       thoughts {
//         _id
//         thoughtText
//         thoughtAuthor
//         createdAt
//       }
//     }
//   }
// `;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;
