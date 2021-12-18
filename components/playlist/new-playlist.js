function NewPlaylist() {
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center mt-4 space-y-5 md:space-y-0 md:space-x-5 md:mt-8 md:flex-row 2xl:space-x-8 text-gray-50">
      <input
        type="text"
        placeholder="Playlist Name"
        className="py-3 pl-3 placeholder-gray-200 bg-gray-800 md:rounded text-gray-50"
      />
      <button
        type="submit"
        className="px-4 py-2 text-base font-semibold bg-indigo-600 rounded cursor-pointer md:text-lg active:bg-indigo-700">
        Create Playlist
      </button>
    </form>
  );
}

export default NewPlaylist;
