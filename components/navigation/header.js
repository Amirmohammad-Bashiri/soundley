import Link from "next/link";
import { SearchIcon, UserCircleIcon } from "@heroicons/react/solid";

function Header() {
  return (
    <header className="flex items-center justify-center px-10 py-6 xl:justify-between">
      {/* search bar */}
      <div className="flex items-center justify-center px-4 py-3 space-x-3 bg-gray-800 border-2 border-gray-400 rounded-lg md:px-6 md:space-x-4 focus-within:border-gray-200">
        <SearchIcon className="w-6 h-6 text-gray-200" />
        <input
          type="text"
          placeholder="Type here to search"
          className="placeholder-gray-300 bg-gray-800 text-gray-50 focus:outline-none"
        />
      </div>

      {/* avatar and name */}
      <div className="items-center hidden space-x-6 text-gray-100 bg-gray-700 rounded-md xl:flex focus-within:border-2 focus-within:border-gray-200">
        <div className="p-2 bg-gray-600 rounded-md">
          <UserCircleIcon className="w-7 h-7" />
        </div>
        <div className="pr-5 text-lg font-bold text-gray-50">
          <Link href="/login">
            <a>Login</a>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
