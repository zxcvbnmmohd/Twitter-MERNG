import gql from "graphql-tag";

export const FETCH_ALL_TWEETS = gql`
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

export const FETCH_TWEET = gql`
  query($tweetID: ID!) {
    getTweet(tweetID: $tweetID) {
      id
      body
      media {
        filename
        mimetype
        encoding
      }
      username
      comments {
        id
        username
        createdAt
        body
      }
      commentsCount
      likes {
        id
        username
        createdAt
      }
      likesCount
      retweetedBy {
        id
        username
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const CREATE_TWEET = gql`
  mutation createTweet($body: String!) {
    createTweet(body: $body) {
      id
      body
      username
      createdAt
      updatedAt
      media {
        filename
        mimetype
        encoding
      }
      comments {
        id
        username
        body
        createdAt
      }
      commentsCount
      likes {
        id
        username
        createdAt
      }
      likesCount
      retweetedBy {
        id
        createdAt
        username
      }
    }
  }
`;