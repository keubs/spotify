import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getMedia from "../api";
import Current from "./current";
import TrackList from "./tracklist";

const Player = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(true);

  const handleTrackSelected = (idx) => {
    setCurrentTrack(tracks[idx]);
    setCurrentTrackIdx(idx);
  };
  
  useEffect(() => {
    async function getMediaFromAPI() {
      const media = await getMedia();
      return media;
    }

    getMediaFromAPI()
      .then((response) => {
        setTracks(response.data.tracks);
        setCurrentTrack(response.data.tracks[currentTrackIdx])
      });
  }, [currentTrackIdx])


  return (
    <StyledPlayer>
      <div>
        <Current
          currentTrack={currentTrack}
          playing={playing}
          advanceTrack={() => {
            setCurrentTrackIdx(currentTrackIdx+1);
          }} />
        <StyledControls>
          <Button
            disabled={currentTrackIdx === 0}
            variant="contained"
            color="primary"
            onClick={() => {
              setCurrentTrackIdx(currentTrackIdx-1)
            }}
          >
            Prev
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setPlaying(!playing)
            }}
          >
            {`${playing ? "Pause" : "Play"}`}
          </Button>
          <Button
            disabled={currentTrackIdx === tracks.length-1}
            variant="contained"
            color="primary"
            onClick={() => {
              setCurrentTrackIdx(currentTrackIdx+1)
            }}
          >
            Next
          </Button>
        </StyledControls>
      </div>

      <TrackList
        tracks={tracks}
        trackSelected={handleTrackSelected}
        currentTrackIdx={currentTrackIdx}
      />
    </StyledPlayer>
  )
};

const StyledPlayer = styled.div`
  max-width: 1000px;
  margin: 2em auto;
  display: flex;
  justify-content: space-around;
`;

const StyledControls = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 300px;
`;

export default Player;
