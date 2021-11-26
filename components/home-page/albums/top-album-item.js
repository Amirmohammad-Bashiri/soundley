import Link from "next/link";
import Image from "next/image";

function TopAlbumItem({ album }) {
  return (
    <li>
      <Link href={`/albums/${album.id}`}>
        <a>
          <div className="relative text-center rounded w-28 h-28 md:w-32 md:h-32 xl:w-20 xl:h-20 2xl:w-28 2xl:h-28 grid-span-1">
            <Image
              src={album.cover_big}
              alt="Album Cover"
              layout="fill"
              className="rounded"
              objectFit="contain"
            />
            <div className="rounded opacity-25 w-28 h-28 md:w-32 md:h-32 xl:w-20 xl:h-20 2xl:w-28 2xl:h-28 border-gray-50 bg-gradient-to-r from-blue-500 via-indigo-800 to-purple-800"></div>

            <p className="mt-3 mb-5 text-sm font-semibold text-gray-100 2xl:text-base line-clamp-2">
              {album.title}
            </p>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default TopAlbumItem;
