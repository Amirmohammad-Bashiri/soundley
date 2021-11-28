import Link from "next/link";
import { ViewGridAddIcon } from "@heroicons/react/solid";

function DesktopPlayer() {
  return (
    <>
      <div className="hidden px-6 2xl:items-center 2xl:justify-between 2xl:flex text-gray-50">
        <h2 className="text-xl font-semibold">Player</h2>
        <button>
          <ViewGridAddIcon className="w-5 h-5 cursor-pointer xl:h-6 xl:w-6" />
        </button>
      </div>

      <div className="flex items-center justify-center px-16 mt-4 2xl:mt-10">
        <div className="w-32 h-24 bg-blue-500 rounded 2xl:w-full 2xl:h-80"></div>
      </div>

      <div className="flex flex-col items-center justify-center px-6 mt-5 2xl:space-y-2">
        <h1 className="text-xl font-semibold 2xl:text-2xl text-gray-50">
          Butterfly Effect
        </h1>
        <Link href="/artists/:artistid">
          <a className="text-base text-gray-300 2xl:text-lg">Travis Scott</a>
        </Link>
      </div>

      <audio />

      <div className="flex items-center px-6 mt-4 space-x-4">
        <time className="font-medium text-gray-100">0:00</time>
        <div className="w-full h-1 bg-gray-600 rounded cursor-pointer">
          <div className="relative w-20 h-full bg-gray-100 rounded">
            <div className="absolute right-0 w-3 h-3 bg-indigo-600 border-2 border-gray-100 rounded-full cursor-pointer -top-1"></div>
          </div>
        </div>
        <time className="font-medium text-gray-100">3:25</time>
      </div>

      <div className="mt-4 2xl:mt-10">
        <div className="flex items-center justify-center space-x-8">
          <i className="text-gray-100 cursor-pointer fas fa-redo-alt fa-lg"></i>
          <i className="text-gray-100 cursor-pointer fas fa-step-backward fa-lg"></i>
          <i className="p-4 text-gray-100 bg-indigo-500 rounded cursor-pointer fas fa-play fa-lg"></i>
          <i className="text-gray-100 cursor-pointer fas fa-step-forward fa-lg"></i>
          <i className="text-gray-100 cursor-pointer fas fa-random fa-lg"></i>
        </div>
      </div>
    </>
  );
}

export default DesktopPlayer;
