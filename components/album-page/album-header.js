import Image from "next/image";
import Link from "next/link";

function AlbumHeader({ data }) {
  return (
    <div className="flex flex-col items-center justify-center w-full md:space-x-8 md:justify-start md:items-end md:flex-row">
      <div className="relative rounded-sm w-52 h-52 xl:w-64 xl:h-64">
        {/* album cover image */}
        <Image
          src={data.cover_big}
          alt="Album Cover"
          layout="fill"
          className="rounded-sm"
          priority={true}
        />
      </div>

      <div className="space-y-5">
        <h3 className="hidden text-lg font-semibold text-gray-100 md:block">
          ALBUM
        </h3>

        {/* album title */}
        <h1 className="text-2xl font-bold text-center md:text-left md:text-4xl xl:text-5xl 2xl:text-6xl text-gray-50">
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

          {/* number of tracks */}
          <small className="font-semibold text-gray-300 md:text-sm">
            {data.tracks.data.length + 1} songs
          </small>
        </div>
      </div>
    </div>
  );
}

export default AlbumHeader;
