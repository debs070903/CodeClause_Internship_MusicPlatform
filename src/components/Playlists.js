import React from "react";
import PropTypes from 'prop-types';
import Card from "./Card";

const Playlists = ({ playlists = [], likedTracks, likeTrack, unlikeTrack }) => {
  return (
    <>
      <h2 className="fw-bold text-center">Your Playlists</h2>
      {playlists.length === 0 ? (
        <div className="text-center">
          <p className="fs-5 text-center">
            Create your first playlist by adding songs to a new playlist!
          </p>
        </div>
      ) : (
        playlists.map((playlist, index) => (
          <div key={index} className="mt-4">
            <h4 className="fw-bold">{playlist.name}</h4>
            <div className="row">
              {playlist.tracks.map((track) => (
                <Card
                  key={track.id}
                  element={track}
                  isLiked={likedTracks.some((t) => t.id === track.id)} 
                  likeTrack={likeTrack}
                  unlikeTrack={unlikeTrack}
                  handleAddToPlaylist={() => {}}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
};

Playlists.propTypes = {
  playlists: PropTypes.array.isRequired,
  likedTracks: PropTypes.array.isRequired,
  likeTrack: PropTypes.func.isRequired,
  unlikeTrack: PropTypes.func.isRequired,
};

export default Playlists;
