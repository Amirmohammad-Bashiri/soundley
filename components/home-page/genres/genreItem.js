import Image from "next/image";
import Link from "next/link";

import danceImage from "../../../public/salsa.jpg";

function GenreItem() {
  return (
    <div className="w-full h-20 cursor-pointer select-none filter contrast-126 md:h-28 lg:h-36 xl:w-72">
      <Link href="/genres" className="relative">
        <a>
          <Image
            src={danceImage}
            alt="dance"
            className="rounded"
            layout="fill"
          />

          <div className="absolute w-full h-full rounded opacity-30 bg-gradient-to-r from-blue-300 via-indigo-500 to-purple-500"></div>

          <p className="absolute text-xl font-bold tracking-wide text-blue-100 md:text-2xl right-2 bottom-1 md:right-4 md:bottom-2">
            Salsa
          </p>
        </a>
      </Link>
    </div>
  );
}

export default GenreItem;