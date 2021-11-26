import Link from "next/link";
import Image from "next/image";

function TopArtistItem({ artist }) {
  const { picture_big, id, name } = artist;

  return (
    <li className="flex flex-col justify-center px-1 pt-4 pb-6 space-y-3 text-center select-none">
      <Link href={`/artists/${id}`}>
        <a className="relative">
          <Image
            src={picture_big}
            alt={name}
            className="rounded"
            layout="fill"
            objectFit="contain"
          />

          <div className="rounded opacity-25 w-28 h-28 md:w-32 md:h-32 border-gray-50 bg-gradient-to-r from-blue-500 via-indigo-800 to-purple-800"></div>
        </a>
      </Link>
      <p className="text-base font-semibold text-gray-300 md:text-lg">{name}</p>
    </li>
  );
}

export default TopArtistItem;
