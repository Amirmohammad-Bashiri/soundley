import cx from "clsx";

function SearchPopupTabs({ setActiveTab, activeTab }) {
  return (
    <section className="sticky top-0 left-0 z-20 w-full bg-black border-b-4 rounded-tl rounded-tr border-b-indigo-600">
      <ul className="grid grid-cols-3 font-semibold text-center divide-x-2 divide-gray-900 text-indigo-50">
        <li
          onClick={() => setActiveTab("track")}
          className={cx("py-3 text-lg cursor-pointer", {
            "bg-indigo-600 rounded-tl": activeTab === "track",
          })}>
          Tracks
        </li>
        <li
          onClick={() => setActiveTab("album")}
          className={cx("py-3 text-lg cursor-pointer", {
            "bg-indigo-600": activeTab === "album",
          })}>
          Albums
        </li>
        <li
          onClick={() => setActiveTab("artist")}
          className={cx("py-3 text-lg cursor-pointer", {
            "bg-indigo-600 rounded-tr": activeTab === "artist",
          })}>
          Artists
        </li>
      </ul>
    </section>
  );
}

export default SearchPopupTabs;
