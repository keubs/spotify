import { useEffect, useState } from "react";
import ReactPlayer from 'react-player'

const Current = ({currentTrack, playing, advanceTrack}) => {
  const [, setSelectedTrack] = useState(currentTrack);
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    setSelectedTrack(currentTrack);
    (currentTrack && currentTrack.mediaUrl && currentTrack.mediaUrl.search(/\.m4v/ig) > 0) ?
      setIsVideo(true) :
      setIsVideo(false);
  }, [currentTrack, isVideo])
  return (
    <div>
      {isVideo 
      ?
      <div>
        {playing
          ?
            <ReactPlayer playing={playing} muted={isVideo} controls url={currentTrack.mediaUrl} />
          :
            <img src={currentTrack.imageUrl} alt={currentTrack.title} />
        }
      </div>
      :
      <div>
        <img src={currentTrack.imageUrl} alt={currentTrack.title} />
        <ReactPlayer
          height={"30px"}
          playing={playing}
          controls
          url={currentTrack.mediaUrl}
          onEnded={() => {
            advanceTrack();
          }}  
        />
      </div>
    }
      <h3>
        {currentTrack.title}
      </h3>
    </div>
  );
}

export default Current;