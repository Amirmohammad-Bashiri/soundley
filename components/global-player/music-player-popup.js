import { useMusicPlayerPopup } from "@store/music-player-popup-context";

function MusicPlayerPopup() {
  const { togglePopup } = useMusicPlayerPopup();

  return (
    <div className="fixed top-0 left-0 z-30 w-full h-full bg-blue-500">
      <button onClick={togglePopup}>close</button>
    </div>
  );
}

export default MusicPlayerPopup;
