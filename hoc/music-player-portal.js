import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";

import { useMusicPlayerPopup } from "@store/music-player-popup-context";

const MusicPlayerPortal = ({ children }) => {
  const { isPopupOpen } = useMusicPlayerPopup();

  if (typeof document !== "undefined") {
    return createPortal(
      <AnimatePresence exitBeforeEnter>
        {isPopupOpen ? children : null}
      </AnimatePresence>,
      document.getElementById("music-portal")
    );
  } else {
    return null;
  }

  // return isPopupOpen
  //   ? createPortal(children, document.getElementById("music-portal"))
  //   : null;
};

export default MusicPlayerPortal;
