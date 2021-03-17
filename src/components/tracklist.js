import styled from "styled-components";


const TrackList = ({tracks, trackSelected, currentTrackIdx}) => {

  return (
    <StyledWrapper>
      {tracks.map((track, idx) => (
        <h2
          className={idx === currentTrackIdx ? 'selected' : ''}
          key={`${idx}-${track.title}`}
        >
          <StyledTrack  
            onClick={() => trackSelected(idx)}
          >
            {track.title}
          </StyledTrack>
        </h2>
      ))}
    </StyledWrapper>
  )
}

const StyledTrack = styled.div`
  border: 1px solid #444;
  cursor: pointer;
  padding: .5em;
`;

const StyledWrapper = styled.div`
  height: 500px;
  overflow-y: auto;
  padding: 0.5em;
  margin: 0 1em;

  h2 {
    &:first-child {
      margin: 0;
    }
    &.selected {
      background: #353570;
      color: white;
    }
  }
`;

export default TrackList;