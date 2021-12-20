function NewPlaylist() {
  return (
    <form className="flex flex-col space-y-6 items-center md:space-x-5 md:space-y-0 md:flex-row 2xl:space-x-8">
      <input
        type="text"
        placeholder="Playlist Name"
        className="py-4 pl-3 2xl:placeholder:text-lg 2xl:text-lg placeholder-gray-200 bg-gray-800 md:rounded text-gray-50"
      />
      <button
        type="submit"
        className="px-6 py-3 text-base font-semibold bg-indigo-600 rounded cursor-pointer text-indigo-50 md:text-lg active:bg-indigo-700">
        Create Playlist
      </button>
    </form>
  );
}

export default NewPlaylist;
