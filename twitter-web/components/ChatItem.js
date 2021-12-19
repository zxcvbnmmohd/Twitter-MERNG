import { Avatar } from "@material-ui/core";

export default function ChatItem({ chat, setChat }) {
    return (
        <div
            className="flex flex-row h-[75px] items-center px-4 cursor-pointer hover:bg-gray-600/50"
            onClick={() => setChat(chat)}
        >
            <div className="flex flex-col w-[35px]">
                <Avatar className="" />
            </div>
            <div className="flex flex-col w-full ml-4">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2">
                        <p>{chat.name}</p>
                        <p className="text-twitter-gray">@{chat.username}</p>
                    </div>
                    <p className="text-twitter-gray">{chat.updatedAt}</p>
                </div>
                <p className="text-twitter-gray whitespace-nowrap overflow-hidden block text-ellipsis w-[270px]">
                    {chat.recentMessage}
                </p>
            </div>
        </div>
    );
}