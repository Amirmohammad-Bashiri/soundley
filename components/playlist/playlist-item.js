function PlaylistItem({ playlist }) {
  return (
    <li className="p-4 bg-gray-800 rounded cursor-pointer md:px-4 md:py-6">
      <strong className="text-lg text-gray-100 line-clamp-1">
        {playlist.name}
      </strong>
    </li>
  );
}

export default PlaylistItem;
