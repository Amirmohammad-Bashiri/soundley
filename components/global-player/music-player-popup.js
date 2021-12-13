import { motion } from "framer-motion";

import { useMusicPlayerPopup } from "@store/music-player-popup-context";

const dropIn = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "spring",
      damping: 50,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

function MusicPlayerPopup() {
  const { togglePopup } = useMusicPlayerPopup();

  return (
    <motion.div
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed top-0 left-0 z-30 w-full h-full bg-gray-900">
      <button className="text-white" onClick={togglePopup}>
        close
      </button>
    </motion.div>
  );
}

export default MusicPlayerPopup;
