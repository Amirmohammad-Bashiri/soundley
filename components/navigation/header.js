import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { SearchIcon, UserCircleIcon } from "@heroicons/react/solid";

function Header() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1124px)",
  });

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
      {isDesktopOrLaptop ? (
        <div className="flex items-center space-x-6 text-gray-100 bg-gray-700 rounded-md focus-within:border-2 focus-within:border-gray-200">
          <div className="p-2 bg-gray-600 rounded-md">
            <UserCircleIcon className="w-7 h-7" />
          </div>
          <div className="pr-5 text-lg font-bold text-gray-50">
            <Link href="/login">
              <a>Login</a>
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Header;
