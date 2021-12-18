import * as React from "react";

const PlaylistPopupContext = React.createContext();
PlaylistPopupContext.displayName = "PlaylistPopupContext";

function PlaylistPopupProvider(props) {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const togglePopup = () => {
    setIsPopupOpen(prevState => !prevState);
  };

  const context = { isPopupOpen, togglePopup };

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
