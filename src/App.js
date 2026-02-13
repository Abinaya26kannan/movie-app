import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched movies:", data);
        if (Array.isArray(data)) {
          setMovies(data);
        } else if (data.movies) {
          setMovies(data.movies);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch(err => console.error("Error fetching movies:", err));
  }, []);

  const filteredMovies = movies.filter(m =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedMovie) {
    return (
      <div className="movie-detail">
        <h2>{selectedMovie.title}</h2>
        <p><strong>Tagline:</strong> {selectedMovie.tagline || "No tagline"}</p>
        <p><strong>Overview:</strong> {selectedMovie.overview}</p>
        <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
        <p><strong>Runtime:</strong> {selectedMovie.runtime} minutes</p>
        <p><strong>Rating:</strong> ⭐ {selectedMovie.vote_average}/10</p>
        <button onClick={() => setSelectedMovie(null)}>Back to list</button>
      </div>
    );
  }

  return (
    <div>
      <header style={{ padding: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "60%",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />
      </header>
      <div className="movie-list">
        {filteredMovies.length === 0 ? (
          <p>No movies found</p>
        ) : (
          filteredMovies.map(m => (
            <div
              key={m.id}
              className="movie-card"
              onClick={() => setSelectedMovie(m)}
            >
              <h3>{m.title}</h3>
              <p>{m.tagline || "No tagline"}</p>
              <p>⭐ {m.vote_average}/10</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
