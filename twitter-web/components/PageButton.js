import Link from "next/link";

export default function PageButton({ href, src, activeSrc, text, isActive }) {
    return (
        <Link href={href}>
            <div className="inline-flex space-x-5 items-center justify-start w-64 h-16 py-4 pl-2.5 pr-20 cursor-pointer">
                <div className="flex items-center justify-center w-8 h-full px-0.5 py-0.5">
                    {
                        isActive
                            ? <img className={"flex-1 h-full rounded-lg " + (isActive ? "fill-blue-500" : "fill-white")} src={activeSrc} />
                            : <img className={"flex-1 h-full rounded-lg " + (isActive ? "fill-blue-500" : "fill-white")} src={src} />
                    }
                </div>
                <p className={"text-lg font-bold " + (isActive ? "text-blue-500" : "text-white")}>{text}</p>
            </div>
        </Link>
    );
}   