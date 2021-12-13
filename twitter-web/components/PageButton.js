import Image from "next/image";

export default function PageButton({ src, text }) {
    return (
        <div className="flex flex-row h-[50px] my-1 px-5 rounded-full cursor-pointer hover:bg-stone-600 hover:bg-opacity-30">
            <Image src={ src } width="25" height="25" objectFit="contain" />
            <h3 className="self-center ml-4 text-lg">{ text }</h3>
        </div>
    );
}   