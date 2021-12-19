import { useState } from "react";

import { useCreatePlaylist } from "@hooks/useCreatePlaylist";

function NewPlaylist() {
  const [playlistName, setPlaylistName] = useState("");

  const mutation = useCreatePlaylist();

  const handleSubmit = e => {
    e.preventDefault();

    mutation.mutate({ playlistName });

    setPlaylistName("");
  };

  const handleChange = e => {
    setPlaylistName(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center mt-4 space-y-5 md:space-y-0 md:space-x-5 md:mt-8 md:flex-row 2xl:space-x-8">
      <input
        type="text"
        placeholder="Playlist Name"
        value={playlistName}
        onChange={handleChange}
        className="py-3 pl-3 placeholder-gray-200 bg-gray-800 md:rounded text-gray-50"
      />
      <button
        type="submit"
        className="px-4 py-2 text-base font-semibold bg-indigo-600 rounded cursor-pointer text-indigo-50 md:text-lg active:bg-indigo-700">
        Create Playlist
      </button>
    </form>
  );
}

export default NewPlaylist;
