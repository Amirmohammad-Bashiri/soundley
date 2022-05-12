import { useState } from "react";

import { useCreatePlaylist } from "@hooks/useCreatePlaylist";

function NewPlaylist() {
  const [playlistName, setPlaylistName] = useState("");

  const mutation = useCreatePlaylist();

  const handleSubmit = e => {
    e.preventDefault();

    if (!playlistName) return;

    mutation.mutate({ playlistName });

    setPlaylistName("");
  };

  const handleChange = e => {
    setPlaylistName(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-6 md:space-x-5 md:space-y-0 md:flex-row 2xl:space-x-8">
      <input
        value={playlistName}
        onChange={handleChange}
        type="text"
        placeholder="Playlist Name"
        className="py-4 pl-3 placeholder-gray-200 bg-gray-800 2xl:placeholder:text-lg 2xl:text-lg md:rounded text-gray-50"
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
