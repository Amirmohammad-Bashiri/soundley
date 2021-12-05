import Link from "next/link";
import {
  HomeIcon,
  HeartIcon,
  CollectionIcon,
  ViewGridIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";

function BottomNavigation() {
  return (
    <nav className="sticky bottom-0 left-0 z-20 w-full py-2 bg-black bg-opacity-80 xl:hidden">
      <ul className="flex items-center justify-around">
        <li>
          <Link href="/">
            <a>
              <div className="flex flex-col items-center justify-center space-y-1 text-gray-100">
                <HomeIcon className="w-6 h-6 md:w-8 md:h-8" />
                <small>Home</small>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/genres">
            <a>
              <div className="flex flex-col items-center justify-center space-y-1 text-gray-100">
                <ViewGridIcon className="w-6 h-6 md:w-8 md:h-8" />
                <small>Genres</small>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/favourites">
            <a>
              <div className="flex flex-col items-center justify-center space-y-1 text-gray-100">
                <HeartIcon className="w-6 h-6 md:w-8 md:h-8" />
                <small>Genres</small>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/playlists">
            <a>
              <div className="flex flex-col items-center justify-center space-y-1 text-gray-100">
                <CollectionIcon className="w-6 h-6 md:w-8 md:h-8" />
                <small>Playlists</small>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/login">
            <a>
              <div className="flex flex-col items-center justify-center space-y-1 text-gray-100">
                <UserCircleIcon className="w-6 h-6 md:w-8 md:h-8" />
                <small>Profile</small>
              </div>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default BottomNavigation;
