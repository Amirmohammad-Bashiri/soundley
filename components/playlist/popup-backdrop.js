import { usePlaylistPopup } from "@store/playlist-popup-contenxt";

function PopupBackdrop() {
  const { togglePopup } = usePlaylistPopup();

  return (
    <div
      onClick={togglePopup}
      className="fixed top-0 left-0 z-50 w-full h-full bg-gray-900 opacity-50"></div>
  );
}

export default PopupBackdrop;
