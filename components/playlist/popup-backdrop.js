import { usePlaylistPopup } from "@store/playlist-popup-context";

function PopupBackdrop() {
  const { togglePlaylistPopup } = usePlaylistPopup();

  return (
    <div
      onClick={togglePlaylistPopup}
      className="fixed top-0 left-0 z-50 w-full h-full bg-gray-900 opacity-50"></div>
  );
}

export default PopupBackdrop;
