import Head from "next/head";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_TWEET } from "../../../apis/";
import { NavBar, TweetSection, BasicallyTheFooter } from "../../../components/";

const Tweet = ({ user, tweet }) => {
  const { loading, data } = useQuery(FETCH_TWEET, {
    variables: {
      tweetID: tweet,
    },
  });
  
  return (
    <div>
      <Head>
        <title>Twitter PERNG Clone | Tweet</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center flex-row bg-black text-twitter-text">
        <NavBar currentPage={"Home"} />
        <TweetSection loading={loading} data={data} />
        <BasicallyTheFooter />
      </main>
    </div>
  );
};

Tweet.requireAuth = true;

export default Tweet;

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          user: "mohd",
          tweet: "61c3f49552803341c51b9059",
        },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps = (context) => {
  return {
    props: {
      user: context.params.user,
      tweet: context.params.tweet,
    },
  };
};
