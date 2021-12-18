import { motion } from "framer-motion";

import { useUser } from "@hooks/useUser";
import NewPlaylist from "./new-playlist";

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

function PlaylistPopup() {
  const { data, isLoading, isFetching } = useUser();

  return (
    <motion.div
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center px-10 playlist-popup space-y-52">
      <NewPlaylist />

      {!data.playlists || data.playlists.length === 0 ? (
        <h1>No Playlists</h1>
      ) : null}
    </motion.div>
  );
}

export default PlaylistPopup;
