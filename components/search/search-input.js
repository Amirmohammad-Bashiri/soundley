import { SearchIcon } from "@heroicons/react/solid";

function SearchInput() {
  return (
    <div className="flex items-center justify-center px-4 py-3 space-x-3 bg-gray-800 border-2 border-gray-400 rounded-lg md:px-6 md:space-x-4 focus-within:border-gray-200">
      <SearchIcon className="w-6 h-6 text-gray-200" />
      <input
        type="text"
        placeholder="Type here to search"
        className="placeholder-gray-300 bg-gray-800 text-gray-50 focus:outline-none"
      />
    </div>
  );
}

export default SearchInput;
