import Image from "next/image";
import { Avatar } from '@material-ui/core'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function TweetsSection({ tweets }) {
    return (
        <div className="min-h-screen w-[600px]">
            <div className="flex flex-row h-[50px] place-content-between px-10">
                <h4 className="flex text-xl self-center">Home</h4>
                <Image src="/images/logo.png" width="25" height="25" objectFit="contain" />
            </div>

            <div className="flex flex-col justify-around h-[125px] border-t border-b border-t-twitter-border border-b-twitter-border">
                <div className="flex flex-row items-center">
                    <div className="flex flex-col items-center w-[50px] px-5 mx-2">
                        <Avatar className="" />
                    </div>
                    <div>
                        What's happening?
                    </div>
                </div>

                <div className="flex flex-row justify-between">
                    <div className="w-[50px] px-5 mx-2">
                    </div>

                    <div className="flex flex-row grow">
                        <div className="self-center mr-3">
                            <Image src="/images/logo.png" width="20" height="20" objectFit="contain" />
                        </div>
                        <div className="self-center mr-3">
                            <Image src="/images/logo.png" width="20" height="20" objectFit="contain" />
                        </div>
                        <div className="self-center mr-3">
                            <Image src="/images/logo.png" width="20" height="20" objectFit="contain" />
                        </div>
                        <div className="self-center mr-3">
                            <Image src="/images/logo.png" width="20" height="20" objectFit="contain" />
                        </div>
                        <div className="self-center mr-3">
                            <Image src="/images/logo.png" width="20" height="20" objectFit="contain" />
                        </div>
                    </div>

                    <div className="self-center bg-twitter-blue px-5 py-2 mr-6 rounded-full text-center hover:bg-twitter-blue-dark cursor-pointer">
                        <h3 className="text-sm font-bold">Tweet</h3>
                    </div>
                </div>
            </div>

            {
                tweets.map((tweet) => <div className="flex flex-rowborder-b border-b-twitter-border cursor-pointer">
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
                        <div className="self-center mr-3">
                            <Image src="/images/logo.png" width="20" height="20" objectFit="contain" />
                        </div>
                        <div className="self-center mr-3">
                            <Image src="/images/logo.png" width="20" height="20" objectFit="contain" />
                        </div>
                        <div className="self-center mr-3">
                            <Image src="/images/logo.png" width="20" height="20" objectFit="contain" />
                        </div>
                        <div className="self-center">
                            <Image src="/images/logo.png" width="20" height="20" objectFit="contain" />
                        </div>
                    </div>
                </div>
            </div>)
            }
        </div>
    );
}