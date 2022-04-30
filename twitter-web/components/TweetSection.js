import { useState } from "react";
import Image from "next/image";
import { Avatar } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_ALL_TWEETS, CREATE_TWEET } from "../apis/";
import { PageTitle, Tweet } from "./";
import Loader from "react-loader-spinner";

export default function TweetSection({ loading, data }) {
  const [values, setValues] = useState({ body: "" });

  const [createTweet, { error }] = useMutation(CREATE_TWEET, {
    variables: values,
    update: (proxy, result) => {
      console.log("SUCCESS");
      const proxyData = proxy.readQuery({
        query: FETCH_ALL_TWEETS,
      });

      proxy.writeQuery({
        query: FETCH_ALL_TWEETS,
        data: {
          getTweets: [result.data.createTweet, ...proxyData.getTweets],
        },
      });

      console.log(result);
      values.body = "";
    },
  });

  const onChanged = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function onCreateTweet(e) {
    e.preventDefault();
    createTweet();
  }

  return loading ? (
    <Loader type="Puff" color="#FFFFFF" height={40} width={40} />
  ) : (
    <div className="h-screen w-[600px] overflow-x-hidden overflow-y-scroll">
      <PageTitle
        title={"Tweet"}
        image={""}
        underTitle={<Tweet tweet={data.getTweet} />}
      />

      <div className="flex flex-col justify-around h-[125px] pb-4 border-t border-b-2 border-t-twitter-border border-b-twitter-border">
        <div className="flex flex-row items-center">
          <form className="flex flex-col grow" onSubmit={onCreateTweet}>
            <div className="flex flex-row">
              <div className="flex flex-col items-center w-[50px] px-5 m-4">
                <Avatar className="" />
              </div>

              <input
                className="flex w-full outline-none bg-transparent my-4"
                placeholder="Tweet your reply"
                name="body"
                type="text"
                value={values.body}
                onChange={(e) => onChanged(e)}
              />
            </div>
            <div>
              <div className="flex flex-row justify-between">
                <div className="flex ml-20">
                  <div className="self-center mr-3 cursor-pointer">
                    <Image
                      src="/images/icons/dark/Media/Default.png"
                      width="25"
                      height="25"
                      objectFit="contain"
                    />
                  </div>
                  <div className="self-center mr-3 cursor-pointer">
                    <Image
                      src="/images/icons/dark/GIF/Default.png"
                      width="25"
                      height="25"
                      objectFit="contain"
                    />
                  </div>
                  <div className="self-center mr-3 cursor-pointer">
                    <Image
                      src="/images/icons/dark/Emoji/Default.png"
                      width="25"
                      height="25"
                      objectFit="contain"
                    />
                  </div>
                  <div className="self-center mr-3 cursor-pointer">
                    <Image
                      src="/images/icons/dark/Location.png"
                      width="25"
                      height="25"
                      objectFit="contain"
                    />
                  </div>
                </div>

                <button
                  className="self-center bg-twitter-blue px-5 py-2 mr-6 rounded-full text-center hover:bg-twitter-blue-dark cursor-pointer"
                  type="submit"
                >
                  <h3 className="text-sm font-bold">Reply</h3>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="">
        <div className="p-4"></div>
      </div>
    </div>
  );
}
