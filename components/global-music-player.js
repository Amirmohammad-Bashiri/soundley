import Image from "next/image";
import { usePlayer } from "@store/player-context";

function GlobalMusicPlayer() {
  const {
    currentTrack,
    play,
    pause,
    goToNextTrack,
    goToPrevTrack,
    isPlaying,
    currentTime,
    audio,
  } = usePlayer();

  const trackTitle = currentTrack.title ? currentTrack.title : "";
  const trackArtist = currentTrack.artist ? currentTrack.artist.name : "";
  const percentage =
    audio && currentTime ? (currentTime / audio.duration) * 100 : 0;

  const actionButtonIcon = isPlaying ? (
    <button onClick={pause}>
      <i className="text-gray-100 cursor-pointer fas fa-pause fa-lg"></i>
    </button>
  ) : (
    <button onClick={play}>
      <i className="text-gray-100 cursor-pointer fas fa-play fa-lg"></i>
    </button>
  );

  return (
    <div className="fixed z-30 flex items-center justify-between w-full h-24 px-5 -mb-1 bg-black xl:-mb-0 opacity-95 bottom-16 xl:bottom-0 xl:right-0">
      <div className="flex items-center space-x-5">
        <div className="relative w-14 h-14">
          {currentTrack.album ? (
            <Image
              src={currentTrack?.album?.cover_medium}
              alt="Track Cover"
              layout="fill"
              className="rounded"
            />
          ) : null}
          <div className="w-12 h-12 rounded opacity-25 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 via-indigo-800 to-purple-800"></div>
        </div>

        <div className="flex flex-col">
          <strong className="text-gray-100 line-clamp-1">{trackTitle}</strong>
          <small className="font-semibold text-gray-300 line-clamp-1">
            {trackArtist}
          </small>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button onClick={goToPrevTrack}>
          <i className="text-gray-100 cursor-pointer fas fa-step-backward fa-lg"></i>
        </button>
        {actionButtonIcon}
        <button onClick={goToNextTrack}>
          <i className="text-gray-100 cursor-pointer fas fa-step-forward fa-lg"></i>
        </button>
      </div>

      <div
        className="absolute left-0 h-1 bg-indigo-900 bottom-2"
        style={{ width: `${percentage}%` }}></div>
    </div>
  );
}

export default GlobalMusicPlayer;
