import Image from "next/image";
import Link from "next/link";
import { PlayIcon, PlusIcon } from "@heroicons/react/solid";

import { useTopTracks } from "@hooks/useTopTracks";
import { soundleyClient } from "@clients/soundley-client";
import { convertTrackDuration } from "@utils/track-duration-converter";

function TopTracks() {
  const { data, isFetching } = useTopTracks(soundleyClient, "/tracks");

  return (
    <ul className="px-6 pb-6 space-y-6">
      {data.map(track => (
        <li className="flex items-center justify-between" key={track.id}>
          <div className="flex items-center space-x-4">
            <Image
              src={track.artist.picture_medium}
              alt={track.title}
              width={60}
              height={60}
              className="rounded"
            />
            <div className="flex flex-col items-center space-y-2">
              <strong className="text-gray-100 line-clamp-1">
                {track.title}
              </strong>
              <Link href={`/artists/${track.artist.id}`}>
                <a className="text-sm text-gray-300 line-clamp-1">
                  {track.artist.name}
                </a>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <time className="font-semibold text-gray-200">
              {convertTrackDuration(track.duration)}
            </time>
            <button className="p-1 bg-gray-800 border border-gray-400 rounded">
              <PlayIcon className="w-5 h-5 text-indigo-500 cursor-pointer xl:h-6 xl:w-6" />
            </button>
            <button className="bg-gray-500 rounded">
              <PlusIcon className="w-4 h-4 cursor-pointer xl:h-5 xl:w-5" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TopTracks;
