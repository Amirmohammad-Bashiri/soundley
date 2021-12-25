import Image from "next/image";
import Link from "next/link";

function TrackHeader({ data }) {
  return (
    <div className="flex flex-col items-center justify-center w-full md:space-x-8 md:justify-start md:items-end md:flex-row">
      <div className="relative flex-shrink-0 rounded-sm w-52 h-52 xl:w-64 xl:h-64">
        {/* Track cover image */}
        <Image
          src={data.album.cover_big}
          alt="Track Cover"
          layout="fill"
          className="rounded-sm"
          objectFit="contain"
          priority={true}
        />
        <div className="absolute top-0 left-0 rounded w-52 h-52 xl:w-64 xl:h-64 opacity-20 border-gray-50 bg-gradient-to-r from-blue-500 via-indigo-800 to-purple-800"></div>
      </div>

      <div className="space-y-5">
        <h3 className="hidden text-lg font-semibold text-gray-100 md:block">
          TRACK
        </h3>

        {/* album title */}
        <h1 className="text-2xl font-bold text-center line-clamp-1 md:text-left md:text-4xl xl:text-5xl 2xl:text-6xl text-gray-50">
          {data.title}
        </h1>
        {/* artist image */}
        <div className="flex items-center space-x-3 md:flex-row">
          <Image
            src={data.artist.picture_small}
            alt="Artist Cover"
            width={40}
            height={40}
            className="rounded-full"
          />

          {/* artist name */}
          <Link href={`/artists/${data.artist.id}`}>
            <a>
              <strong className="text-sm text-gray-100 md:text-base xl:text-lg">
                {data.artist.name}
              </strong>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TrackHeader;
