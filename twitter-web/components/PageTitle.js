import Image from "next/image";

export default function PageTitle({ title, image, underTitle }) {
  return (
    <div>
      <div className="flex flex-row justify-between h-[55px]">
        <p className="text-lg font-bold text-white m-[15px]">{title}</p>
        {image !== "" ? (
          <div className="inline-flex items-center justify-center w-6 h-6 p-0.5 m-[15px]">
            <Image src={image} width="25" height="25" objectFit="contain" />
          </div>
        ) : null}
      </div>
      {underTitle}
      <div className="bg-gray-700 w-full h-[1px]" />
    </div>
  );
}
