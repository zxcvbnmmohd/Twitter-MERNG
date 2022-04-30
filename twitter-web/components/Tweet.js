import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@material-ui/core";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";

export default function Tweet({ tweet }) {
    return (
        <Link href={tweet.username + "/status/" + tweet.id} key={tweet.id}>
            <div
                key={tweet.id}
                className="flex flex-row border-b-2 border-b-twitter-border cursor-pointer"
            >
                <Link href={"/" + tweet.username}>
                    <div className="p-3">
                        <Avatar />
                    </div>
                </Link>
                <div className="flex flex-col grow">
                    <div className="flex flex-row mt-3 justify-between pr-3">
                        <div className="flex flex-row cursor-pointer">
                            <h3 className="mr-2">{tweet.name}</h3>
                            <h3 className="text-twitter-gray mr-2">@{tweet.username}</h3>
                            <h3 className="text-twitter-gray mr-2">·</h3>
                            <h3 className="text-twitter-gray">
                                {moment(tweet.createdAt, ).fromNow(true)} ago
                            </h3>
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
        </Link>
    );
}
