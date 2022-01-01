import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";

import { usePlaylistPopup } from "@store/playlist-popup-context";

const PlaylistPortal = ({ children }) => {
  const { isPopupOpen } = usePlaylistPopup();

  if (typeof document !== "undefined") {
    return createPortal(
      <AnimatePresence>{isPopupOpen ? children : null}</AnimatePresence>,
      document.getElementById("playlist-portal")
    );
  } else {
    return null;
  }
};

export default PlaylistPortal;
