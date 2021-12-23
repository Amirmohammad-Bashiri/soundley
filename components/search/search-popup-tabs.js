import cx from "clsx";

function SearchPopupTabs({ setActiveTab, activeTab }) {
  return (
    <section className="bg-gray-500 rounded-tl rounded-tr">
      <ul className="grid grid-cols-3 font-semibold text-center divide-x-2 divide-gray-900 text-indigo-50">
        <li
          onClick={() => setActiveTab("track")}
          className={cx("py-3 text-lg cursor-pointer", {
            "bg-indigo-500 rounded-tl": activeTab === "track",
          })}>
          Tracks
        </li>
        <li
          onClick={() => setActiveTab("album")}
          className={cx("py-3 text-lg cursor-pointer", {
            "bg-indigo-500": activeTab === "album",
          })}>
          Albums
        </li>
        <li
          onClick={() => setActiveTab("artist")}
          className={cx("py-3 text-lg cursor-pointer", {
            "bg-indigo-500 rounded-tr": activeTab === "artist",
          })}>
          Artists
        </li>
      </ul>
    </section>
  );
}

export default SearchPopupTabs;
