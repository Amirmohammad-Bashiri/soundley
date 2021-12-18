import { motion } from "framer-motion";

import { useUser } from "@hooks/useUser";
import NewPlaylist from "./new-playlist";
import NoPlaylists from "./no-playlists";

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
      className="flex flex-col items-center px-10 space-y-16 playlist-popup space-y-44 xl:space-y-52">
      <NewPlaylist />

      {data && (!data.playlists || data.playlists.length === 0) ? (
        <NoPlaylists />
      ) : null}
    </motion.div>
  );
}

export default PlaylistPopup;
