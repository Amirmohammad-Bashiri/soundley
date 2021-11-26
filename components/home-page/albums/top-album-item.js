import Link from "next/link";
import Image from "next/image";

function TopAlbumItem({ album }) {
  return (
    <Link href={`/albums/${album.id}`}>
      <a>
        <div className="relative text-center rounded w-28 h-28 grid-span-1">
          <Image
            src={album.cover_big}
            alt="Album Cover"
            layout="fill"
            className="rounded"
            objectFit="contain"
          />
          <div className="rounded opacity-25 w-28 h-28 border-gray-50 bg-gradient-to-r from-blue-500 via-indigo-800 to-purple-800"></div>

          <p className="my-2 font-semibold text-gray-100 line-clamp-2">
            {album.title}
          </p>
        </div>
      </a>
    </Link>
  );
}

export default TopAlbumItem;
