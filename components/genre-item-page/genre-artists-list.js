import Link from "next/link";
import Image from "next/image";

function GenreArtistsList({ artists }) {
  return (
    <ul className="flex flex-wrap items-center justify-between gap-x-5 gap-y-10">
      {artists.map(artist => (
        <li key={artist.id}>
          <Link href={`/artists/${artist.id}`}>
            <a>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-40 h-40 rounded-sm">
                  <Image
                    src={artist.picture_medium}
                    alt="Artist Cover"
                    layout="fill"
                    className="rounded-sm"
                  />
                  <div className="absolute w-full h-full rounded-sm border-gray-50 opacity-30 bg-gradient-to-r from-blue-500 via-indigo-800 to-purple-800"></div>
                </div>
                <strong className="text-lg text-gray-100">{artist.name}</strong>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default GenreArtistsList;
