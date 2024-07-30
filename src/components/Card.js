import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const Card = ({ element, isLiked, likeTrack, unlikeTrack, handleAddToPlaylist }) => {
  return (
    <div className="col-lg-3 col-md-6 py-2">
      <div className="card">
        <img src={element.album.images[0].url} className="card-img-top" alt={element.name} />
        <div className="card-body">
          <h5 className="card-title">{element.name}</h5>
          <p className="card-text">
            Artist: {element.album.artists[0].name}
          </p>
          <p className="card-text">
            Release Date: {element.album.release_date}
          </p>
          <audio src={element.preview_url} controls className="w-100"></audio>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
            <FontAwesomeIcon
              icon={isLiked ? solidHeart : regularHeart}
              className={`fa-2x ${isLiked ? 'text-danger' : 'text-secondary'}`}
              onClick={() => isLiked ? unlikeTrack(element.id) : likeTrack(element)}
              style={{cursor:"pointer"}}
            />
            <FontAwesomeIcon
              icon={faPlus}
              className="fa-2x text-secondary"
              onClick={() => handleAddToPlaylist(element)}
              style={{cursor:"pointer"}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  element: PropTypes.object.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likeTrack: PropTypes.func.isRequired,
  unlikeTrack: PropTypes.func.isRequired,
  handleAddToPlaylist: PropTypes.func.isRequired
};

export default Card;
