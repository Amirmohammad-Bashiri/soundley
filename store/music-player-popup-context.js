import * as React from "react";

const MusicPlayerPopupContext = React.createContext();
MusicPlayerPopupContext.displayName = "MusicPlayerPopupContext";

function MusicPlayerPopupProvider(props) {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const togglePopup = () => {
    setIsPopupOpen(prevState => !prevState);
  };

  const context = { isPopupOpen, togglePopup };

  return <MusicPlayerPopupContext.Provider value={context} {...props} />;
}

export function useMusicPlayerPopup() {
  const context = React.useContext(MusicPlayerPopupContext);

  if (!context) {
    throw new Error(
      "useMusicPlayerPopup must be within a MusicPlayerPopupProvider"
    );
  }

  return context;
}

export default MusicPlayerPopupProvider;
