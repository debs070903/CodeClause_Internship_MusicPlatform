import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CardContent from "./components/CardContent";
import LikedMusic from "./components/LikedMusic";
import Playlists from "./components/Playlists";

function App() {
  const [keyword, setKeyword] = useState("");
  const [tracks, setTracks] = useState([]);
  const [likedTracks, setLikedTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const storedLikedTracks =
      JSON.parse(localStorage.getItem("likedTracks")) || [];
    setLikedTracks(storedLikedTracks);

    const storedPlaylists = JSON.parse(localStorage.getItem("playlists")) || [];
    setPlaylists(storedPlaylists);
    console.log("Loaded playlists from localStorage:", storedPlaylists);
  }, []);

  useEffect(() => {
    if (playlists.length > 0) {
      console.log("Saving playlists to localStorage:", playlists);
      localStorage.setItem("playlists", JSON.stringify(playlists));
    }
  }, [playlists]);

  const fetchMusicData = async () => {
    setTracks([]);
    try {
      const response = await fetch(
        `https://v1.nocodeapi.com/debanik07/spotify/GWLQFzmzCNdYtmgu/search?q=${keyword}&type=track`
      );
      const jsonData = await response.json();
      setTracks(jsonData.tracks.items);
    } catch (error) {
      console.error("Error fetching music data:", error.message);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchMusicData();
    }
  };

  const likeTrack = (track) => {
    const updatedLikedTracks = [...likedTracks, track];
    setLikedTracks(updatedLikedTracks);
    localStorage.setItem("likedTracks", JSON.stringify(updatedLikedTracks));
  };

  const unlikeTrack = (trackId) => {
    const updatedLikedTracks = likedTracks.filter(
      (track) => track.id !== trackId
    );
    setLikedTracks(updatedLikedTracks);
    localStorage.setItem("likedTracks", JSON.stringify(updatedLikedTracks));
  };

  const createPlaylistAndAddTrack = (track, playlistName) => {
    if (!playlistName) return;

    const newPlaylist = {
      name: playlistName,
      tracks: [track],
    };

    setPlaylists((prevPlaylists) => {
      const updatedPlaylists = [...prevPlaylists, newPlaylist];
      console.log("Creating new playlist and adding track:", updatedPlaylists);
      return updatedPlaylists;
    });
  };

  const addToPlaylist = (track, playlistName) => {
    setPlaylists((prevPlaylists) => {
      const updatedPlaylists = prevPlaylists.map((playlist) => {
        if (playlist.name === playlistName) {
          const trackIndex = playlist.tracks.findIndex(
            (t) => t.id === track.id
          );
          if (trackIndex !== -1) {
            if (
              window.confirm(
                `Are you sure you want to remove the track from the playlist?`
              )
            ) {
              playlist.tracks.splice(trackIndex, 1);
            }
          } else {
            playlist.tracks.push(track);
          }
        }
        return playlist;
      });
      console.log("Updating playlist:", updatedPlaylists);
      return updatedPlaylists;
    });
  };

  return (
    <>
      <Navbar
        keyword={keyword}
        setKeyword={setKeyword}
        handleKeyPress={handleKeyPress}
      />
      <div className="container">
        <CardContent
          tracks={tracks}
          likeTrack={likeTrack}
          likedTracks={likedTracks}
          unlikeTrack={unlikeTrack}
          addToPlaylist={addToPlaylist}
          createPlaylistAndAddTrack={createPlaylistAndAddTrack}
          playlists={playlists}
        />
      </div>
      <div className="container py-5 text-center" hidden={tracks.length !== 0}>
        <h1 className="fw-bold">Welcome to Muzic!</h1>
        <p className="fs-6 mt-10">
          Welcome to your ultimate music player platform! Whether you're
          curating your perfect playlist or discovering new artists, we provide
          everything you need for an unparalleled listening experience. With
          high-quality audio, personalized recommendations, and seamless
          integration across your devices, immerse yourself in the world of
          music like never before. Let us be your soundtrack to inspiration,
          relaxation, and everything in between!
        </p>
      </div>
      <div className="container">
        <LikedMusic
          likedTracks={likedTracks}
          unlikeTrack={unlikeTrack}
          handleAddToPlaylist={addToPlaylist}
          playlists={playlists}
        />
      </div>
      <div className="container mt-5">
        <Playlists
          playlists={playlists}
          likedTracks={likedTracks}
          likeTrack={likeTrack}
          unlikeTrack={unlikeTrack}
        />
      </div>
    </>
  );
}

export default App;
