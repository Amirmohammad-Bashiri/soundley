import { motion } from "framer-motion";

import { useUser } from "@hooks/useUser";
import NewPlaylist from "./new-playlist";
import NoPlaylists from "./no-playlists";
import Playlist from "./playlist";
import Loader from "@components/loader";

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
  const { data, isLoading } = useUser();

  return (
    <motion.div
      key="playlist"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center px-10 space-y-14 playlist-popup md:space-y-20">
      <NewPlaylist />

      {isLoading ? (
        <Loader type="Oval" color="#D1D5DB" height={100} width={100} />
      ) : (
        <>
          {!data.playlists || data.playlists.length === 0 ? (
            <NoPlaylists />
          ) : (
            <Playlist data={data} />
          )}
        </>
      )}
    </motion.div>
  );
}

export default PlaylistPopup;
