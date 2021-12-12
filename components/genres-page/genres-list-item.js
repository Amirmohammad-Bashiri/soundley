import Image from "next/image";
import Link from "next/link";

function GenresListItem({ genre }) {
  return (
    <li key={genre.id} className="transition duration-300 hover:scale-105">
      <Link href={`/genres/${genre.id}`}>
        <a>
          <div className="relative h-40 rounded md:h-32 w-72 md:w-60 xl:h-32 xl:w-60 2xl:h-40 2xl:w-72">
            <Image
              src={genre.picture_medium}
              alt="Genre Cover"
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
            <div className="absolute w-full h-full rounded border-gray-50 opacity-30 bg-gradient-to-r from-blue-500 via-indigo-800 to-purple-800"></div>
            <strong className="absolute text-2xl font-bold tracking-wide text-indigo-100 md:text-2xl right-2 bottom-1 md:right-4 md:bottom-2">
              {genre.name}
            </strong>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default GenresListItem;
