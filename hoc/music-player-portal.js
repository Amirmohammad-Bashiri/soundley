import { createPortal } from "react-dom";

import { useMusicPlayerPopup } from "@store/music-player-popup-context";

const MusicPlayerPortal = ({ children }) => {
  const { isPopupOpen } = useMusicPlayerPopup();

  return isPopupOpen
    ? createPortal(children, document.getElementById("music-portal"))
    : null;
};

export default MusicPlayerPortal;
