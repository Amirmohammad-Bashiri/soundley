function SearchPopupTabs({ setActiveTab }) {
  return (
    <section className="bg-indigo-500 rounded-tl rounded-tr">
      <ul className="grid grid-cols-3 font-semibold text-center divide-x-2 divide-gray-900 text-indigo-50">
        <li
          onClick={() => setActiveTab("track")}
          className="py-3 text-lg cursor-pointer">
          Tracks
        </li>
        <li
          onClick={() => setActiveTab("album")}
          className="py-3 text-lg cursor-pointer">
          Albums
        </li>
        <li
          onClick={() => setActiveTab("artist")}
          className="py-3 text-lg cursor-pointer">
          Artists
        </li>
      </ul>
    </section>
  );
}

export default SearchPopupTabs;
