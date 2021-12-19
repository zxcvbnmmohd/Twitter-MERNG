import { useState } from "react";
import Image from "next/image";
import { Avatar } from "@material-ui/core";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { PageTitle } from "../components/";
import Loader from "react-loader-spinner";

export default function TweetsSection({ isLoading, tweets }) {
    const [tweet, setTweet] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="min-h-screen w-[600px]">
        
        <PageTitle title={"Home"} image={"/images/icons/dark/TopTweet/Default.png"} />

            <div className="flex flex-col justify-around h-[125px] border-t border-b-2 border-t-twitter-border border-b-twitter-border">
                <div className="flex flex-row items-center">
                    <form className="flex flex-col grow" onSubmit={(e) => { }}>
                        <div className="flex flex-row">
                            <div className="flex flex-col items-center w-[50px] px-5 m-4">
                                <Avatar className="" />
                            </div>
                            <input
                                className="flex w-full outline-none bg-transparent my-4"
                                placeholder="What's happening?"
                                name="username"
                                type="text"
                                value={tweet}
                                onChange={(e) => setTweet(e.target.value)}
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
                                            src="/images/icons/dark/Poll/Default.png"
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
                                            src="/images/icons/dark/Schedule/Default.png"
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
                                    <h3 className="text-sm font-bold">Tweet</h3>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {tweets.map((tweet) => (
                <div
                    key={tweet.id}
                    className="flex flex-rowborder-b border-b-2 border-b-twitter-border cursor-pointer"
                >
                    <div className="p-3">
                        <Avatar />
                    </div>
                    <div className="flex flex-col grow">
                        <div className="flex flex-row mt-3 justify-between pr-3">
                            <div className="flex flex-row cursor-pointer">
                                <h3 className="mr-2">moh'd</h3>
                                <h3 className="text-twitter-gray mr-2">@{tweet.username}</h3>
                                <h3 className="text-twitter-gray mr-2">·</h3>
                                <h3 className="text-twitter-gray">44m</h3>
                            </div>
                            <div className="cursor-pointer rounded-full hover:text-twitter-blue hover:bg-twitter-blue/20 h-[30px] w-[30px] justify-center items-center flex">
                                <MoreHorizIcon />
                            </div>
                        </div>

                        <p className="flex text-sm font-light">{tweet.body}</p>

                        <div className="flex flex-row justify-between mt-5 mb-5 pr-28">
                            <div className="self-center mr-3" onClick={() => { }}>
                                <Image
                                    src="/images/icons/dark/Comment/Default.png"
                                    width="20"
                                    height="20"
                                    objectFit="contain"
                                />
                            </div>
                            <div className="self-center mr-3" onClick={() => { }}>
                                <Image
                                    src="/images/icons/dark/Retweet/Default.png"
                                    width="20"
                                    height="20"
                                    objectFit="contain"
                                />
                            </div>
                            <div className="self-center mr-3" onClick={() => { }}>
                                <Image
                                    src="/images/icons/dark/Like/Default.png"
                                    width="20"
                                    height="20"
                                    objectFit="contain"
                                />
                            </div>
                            <div className="self-center" onClick={() => { }}>
                                <Image
                                    src="/images/icons/dark/Share/Default.png"
                                    width="20"
                                    height="20"
                                    objectFit="contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
