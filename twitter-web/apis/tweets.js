import gql from "graphql-tag";

const FETCH_ALL_TWEETS = gql`
{
  getTweets {
    id
    body
    username
    comments {
      id
      body
      username
      createdAt
    }
    createdAt
    updatedAt
    likes {
      id
      username
      createdAt
    }
    commentsCount
    likesCount
  }
}
`;

export { FETCH_ALL_TWEETS };