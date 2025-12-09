import React from "react";

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => (
  <div className="movie-card">
    <img
      src={
        //check if there is a movie poster in the movie db api 
        poster_path
          ? `https://image.tmdb.org/t/p/w500/${poster_path}`
          : "no-poster.png"
      }
      alt="Poster"
    />

    <div className="mt-4">
      <h3 className="text-left">{title}</h3>

      <div className="content">
        <div className="rating">
          <img src="star.svg" alt="star" />
          {/* fix the rating to 1 decimal point */}
          <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p> 
        </div>
        <span>•</span>
        <p className="lang">{original_language}</p>z
        <span>•</span>
        <p className="year">
          {/* format api-given date to just the year (split using '-' delimiter, then return first part) */}
          {release_date ? release_date.split("-")[0] : "N/A"}
        </p>
      </div>
    </div>
  </div>
);

export default MovieCard;
