import Image from "next/image";
import Link from "next/link";

function GenreItem({ genre }) {
  const { id, picture_big, name } = genre;

  return (
    <div className="w-full h-20 cursor-pointer select-none filter contrast-126 md:h-28 lg:h-36 xl:w-72">
      <Link href={`/genres/${id}`} className="relative">
        <a>
          <Image
            src={picture_big}
            alt="name"
            className="rounded"
            layout="fill"
            objectFit="cover"
          />

          <div className="absolute w-full h-full rounded opacity-30 bg-gradient-to-r from-blue-500 via-indigo-800 to-purple-800"></div>

          <p className="absolute text-xl font-bold tracking-wide text-blue-100 md:text-2xl right-2 bottom-1 md:right-4 md:bottom-2">
            {name}
          </p>
        </a>
      </Link>
    </div>
  );
}

export default GenreItem;
