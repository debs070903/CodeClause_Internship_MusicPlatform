import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const CardContent = ({ tracks, likeTrack, likedTracks, unlikeTrack, addToPlaylist, createPlaylistAndAddTrack, playlists }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleAddToPlaylist = (track) => {
    setSelectedTrack(track);
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName) {
      createPlaylistAndAddTrack(selectedTrack, newPlaylistName);
      setNewPlaylistName('');
      setSelectedTrack(null);
    }
  };

  const handleAddTrackToExistingPlaylist = (playlistName) => {
    addToPlaylist(selectedTrack, playlistName);
    setSelectedTrack(null);
  };

  return (
    <div>
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

      <div className="row">
        {tracks.map((element) => (
          <Card
            key={element.id}
            element={element}
            isLiked={likedTracks.some((track) => track.id === element.id)}
            likeTrack={likeTrack}
            unlikeTrack={unlikeTrack}
            handleAddToPlaylist={handleAddToPlaylist}
          />
        ))}
      </div>
    </div>
  );
};

CardContent.propTypes = {
  tracks: PropTypes.array.isRequired,
  likeTrack: PropTypes.func.isRequired,
  likedTracks: PropTypes.array.isRequired,
  unlikeTrack: PropTypes.func.isRequired,
  addToPlaylist: PropTypes.func.isRequired,
  createPlaylistAndAddTrack: PropTypes.func.isRequired,
  playlists: PropTypes.array.isRequired,
};

export default CardContent;
