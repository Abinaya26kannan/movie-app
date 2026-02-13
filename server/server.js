const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

// Load movies from JSON file
const movies = JSON.parse(fs.readFileSync(path.join(__dirname, "movies_metadata.json")));

app.get("/api/ping", (req, res) => {
  res.send("pong!");
});

app.get("/api/movies", (req, res) => {
  res.json(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

app.listen(PORT, () => {
  console.log(`❇️ Express server is running on port ${PORT}`);
});
