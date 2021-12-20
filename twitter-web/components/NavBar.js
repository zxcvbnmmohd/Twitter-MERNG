import Router from "next/router";
import { Avatar } from "@material-ui/core";
import LogoutIcon from "@mui/icons-material/Logout";
import { PageButton, useAuth } from "./";

export default function NavBar({ currentPage }) {
    const { auth, user } = useAuth();
    
    return (
        <div className="flex flex-col justify-between border-r border-r-twitter-border w-[300px] min-h-screen">
            <div className="inline-flex flex-col items-start justify-start">
                <div className="inline-flex items-center justify-start w-64 h-14 pl-2.5 pr-52 pt-2.5 pb-3">
                    <div className="flex items-center justify-center flex-1 py-0.5 pl-0.5">
                        <img
                            className="flex-1 h-full rounded-lg"
                            src="/images/icons/dark/Logo.png"
                        />
                    </div>
                </div>

                <PageButton
                    href="/home"
                    src="/images/icons/dark/Home/Default.png"
                    activeSrc="/images/icons/dark/Home/Selected.png"
                    text="Home"
                    isActive={currentPage === "Home"}
                />
                <PageButton
                    href="#"
                    src="/images/icons/dark/Explore/Default.png"
                    activeSrc="/images/icons/dark/Explore/Selected.png"
                    text="Explore"
                    isActive={currentPage === "Explore"}
                />
                <PageButton
                    href="#"
                    src="/images/icons/dark/Notifications/Default.png"
                    activeSrc="/images/icons/dark/Notifications/Selected.png"
                    text="Notifications"
                    isActive={currentPage === "Notifications"}
                />
                <PageButton
                    href="/messages"
                    src="/images/icons/dark/Messages/Default.png"
                    activeSrc="/images/icons/dark/Messages/Selected.png"
                    text="Messages"
                    isActive={currentPage === "Messages"}
                />
                <PageButton
                    href="#"
                    src="/images/icons/dark/Bookmarks/Default.png"
                    activeSrc="/images/icons/dark/Bookmarks/Selected.png"
                    text="Bookmarks"
                    isActive={currentPage === "Bookmarks"}
                />
                <PageButton
                    href="#"
                    src="/images/icons/dark/Lists/Default.png"
                    activeSrc="/images/icons/dark/Lists/Selected.png"
                    text="Lists"
                    isActive={currentPage === "Lists"}
                />
                <PageButton
                    href="#"
                    src="/images/icons/dark/Profile/Default.png"
                    activeSrc="/images/icons/dark/Profile/Selected.png"
                    text="Profile"
                    isActive={currentPage === "Profile"}
                />
                <PageButton
                    href="#"
                    src="/images/icons/dark/More/Default.png"
                    activeSrc="/images/icons/dark/More/Selected.png"
                    text="More"
                    isActive={currentPage === "More"}
                />

                <div className="inline-flex flex-col items-start justify-start py-4 cursor-pointer">
                    <div className="inline-flex items-center justify-center px-24 py-4 bg-blue-500 hover:bg-blue-600 rounded-full">
                        <p className="text-base font-bold leading-tight text-center text-white">
                            Tweet
                        </p>
                    </div>
                </div>
            </div>

            <div
                className="flex flex-row mb-5 mr-3 pl-5 py-2 justify-items-center justify-between rounded-full cursor-pointer hover:bg-stone-600 hover:bg-opacity-30"
                onClick={() => auth.logout()}
            >
                <div className="flex flex-col justify-center w-[50px]">
                    <Avatar className="" src={user.selfie ?? ""} />
                </div>
                <div className="flex flex-col grow mx-1 justify-around">
                    <p className="whitespace-nowrap overflow-hidden block text-ellipsis w-[160px]">{user.name}</p>
                    <p className="text-twitter-text/40">@{user.username}</p>
                </div>
                <div className="flex flex-col justify-center w-[50px]">
                    <LogoutIcon />
                </div>
            </div>
        </div>
    );
}
