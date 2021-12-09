import Image from "next/image";
import Link from "next/link";

function AlbumHeader({ data }) {
  return (
    <div className="flex items-end w-full space-x-8">
      <div className="relative w-64 h-64 rounded-sm">
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
        <h3 className="text-lg font-semibold text-gray-100">ALBUM</h3>

        {/* album title */}
        <h1 className="text-6xl font-bold text-gray-50">{data.title}</h1>
        {/* artist image */}
        <div className="flex items-center space-x-3">
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
              <strong className="text-gray-100">{data.artist.name}</strong>
            </a>
          </Link>

          {/* number of tracks */}
          <small className="font-semibold text-gray-300">
            {data.tracks.data.length + 1} songs
          </small>
        </div>
      </div>
    </div>
  );
}

export default AlbumHeader;
