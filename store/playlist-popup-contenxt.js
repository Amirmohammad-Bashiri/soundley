import * as React from "react";

const PlaylistPopupContext = React.createContext();
PlaylistPopupContext.displayName = "PlaylistPopupContext";

function PlaylistPopupProvider(props) {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [selectedTrackForPlaylist, setSelectedTrackForPlaylist] =
    React.useState(null);

  const togglePlaylistPopup = () => {
    setIsPopupOpen(prevState => !prevState);
  };

  const selectTrackForPlaylist = track => {
    setSelectedTrackForPlaylist(track);
  };

  const context = {
    isPopupOpen,
    selectTrackForPlaylist,
    togglePlaylistPopup,
    selectedTrackForPlaylist,
  };

  return <PlaylistPopupContext.Provider value={context} {...props} />;
}

export function usePlaylistPopup() {
  const context = React.useContext(PlaylistPopupContext);

  if (!context) {
    throw new Error("usePlaylistPopup must be within a PlaylistPopupProvider");
  }

  return context;
}

export default PlaylistPopupProvider;
