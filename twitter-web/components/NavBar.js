import Image from "next/image";
import { Avatar } from '@material-ui/core'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PageButton } from "./"

export default function NavBar() {
    return (
        <div className="flex flex-col justify-between border-r border-r-twitter-border w-[300px] min-h-screen">
            <div className="grid auto-rows-min justify-items-start">
                <div className="flex h-[50px] ml-5">
                    <div className="self-center">
                        <Image src="/images/logo.png" width="25" height="25" objectFit="contain" />
                    </div>
                </div>

                <PageButton src="/images/logo.png" text="Home" />
                <PageButton src="/images/logo.png" text="Explore" />
                <PageButton src="/images/logo.png" text="Notifications" />
                <PageButton src="/images/logo.png" text="Messages" />
                <PageButton src="/images/logo.png" text="Bookmarks" />
                <PageButton src="/images/logo.png" text="Lists" />
                <PageButton src="/images/logo.png" text="Profile" />
                <PageButton src="/images/logo.png" text="More" />

                <div className="self-center bg-twitter-blue mt-5 w-4/5 rounded-full text-center py-3 hover:bg-twitter-blue-dark cursor-pointer">
                    <h3 className="text-md font-bold">Tweet</h3>
                </div>
            </div>

            <div className="flex flex-row mb-5 mr-3 pl-5 py-2 justify-items-center justify-between rounded-full cursor-pointer hover:bg-stone-600 hover:bg-opacity-30">
                <div className="flex flex-col justify-center w-[50px]">
                    <Avatar className="" />
                </div>
                <div className="flex flex-col grow mx-1 justify-around">
                    <div className="">moh'd</div>
                    <div className="text-twitter-text/40">@zxcvbnmmohd</div>
                </div>
                <div className="flex flex-col justify-center w-[50px]">
                    <MoreHorizIcon />
                </div>
            </div>
        </div>
    );
}