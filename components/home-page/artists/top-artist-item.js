import Link from "next/link";
import Image from "next/image";

function TopArtistItem({ artist }) {
  const { picture_big, id, name } = artist;

  return (
    <li className="flex flex-col justify-center px-1 py-4 space-y-3 text-center select-none">
      <Link href={`/artists/${id}`}>
        <a className="relative">
          <Image
            src={picture_big}
            alt={name}
            className="rounded"
            layout="fill"
            objectFit="contain"
          />

          <div className="rounded h-44 w-44 border-gray-50 opacity-30 bg-gradient-to-r from-blue-500 via-indigo-800 to-purple-800"></div>
        </a>
      </Link>
      <p className="text-lg font-semibold text-gray-300">{name}</p>
    </li>
  );
}

export default TopArtistItem;
