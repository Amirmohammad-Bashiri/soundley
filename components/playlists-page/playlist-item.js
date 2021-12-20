import Link from "next/link";
import { XCircleIcon } from "@heroicons/react/solid";

function PlaylistItem({ playlist }) {
  return (
    <li className="flex bg-gradient-to-r from-gray-800 to-gray-700 py-8 px-4 md:px-6 xl:px-8 rounded items-center justify-between">
      <Link href={`/playlists/${playlist.id}`}>
        <a className="text-gray-100 line-clamp-1 text-2xl font-semibold">
          {playlist.name}
        </a>
      </Link>
      <button className="cursor-pointer">
        <XCircleIcon className="w-7 h-7 text-lg text-rose-500" />
      </button>
    </li>
  );
}

export default PlaylistItem;
