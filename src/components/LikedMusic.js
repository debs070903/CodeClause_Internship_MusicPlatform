import React, { useState } from "react";
import Card from "./Card";

const LikedMusic = ({ likedTracks, unlikeTrack, handleAddToPlaylist, playlists }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleTrackSelection = (track) => {
    setSelectedTrack(track);
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName) {
      handleAddToPlaylist(selectedTrack, newPlaylistName);
      setNewPlaylistName('');
      setSelectedTrack(null);
    }
  };

  const handleAddTrackToExistingPlaylist = (playlistName) => {
    handleAddToPlaylist(selectedTrack, playlistName);
    setSelectedTrack(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-center">Liked Music</h2>
      {likedTracks.length === 0 ? (
        <div className="text-center">
          <p className="fs-5 text-center">
            Looks like you haven't liked any songs yet. Start exploring and add
            some tunes to your favorites!
          </p>
        </div>
      ) : (
        <div className="row">
          {likedTracks.map((track) => (
            <Card
              key={track.id}
              element={track}
              isLiked={true}
              likeTrack={() => {}}
              unlikeTrack={unlikeTrack}
              handleAddToPlaylist={handleTrackSelection}
            />
          ))}
        </div>
      )}

      {selectedTrack && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add to Playlist</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedTrack(null)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="New playlist name"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                />
                <button className="btn btn-primary mt-2" onClick={handleCreatePlaylist}>
                  Create and Add
                </button>
                <hr />
                <h5>Or add to existing playlist:</h5>
                {playlists.map((playlist) => (
                  <button
                    key={playlist.name}
                    className="btn btn-secondary mt-2 w-100"
                    onClick={() => handleAddTrackToExistingPlaylist(playlist.name)}
                  >
                    {playlist.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikedMusic;
