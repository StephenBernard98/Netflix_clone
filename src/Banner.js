import React, { useEffect, useState } from "react";
import instance from "./axios";
import requests from "./requests";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    let _fetchData = async () => {
      const getMovieBanner = await instance.get(requests.fetchNetflixOriginals);
      setMovie(
        getMovieBanner.data.results[
          Math.floor(Math.random() * getMovieBanner.data.results.length - 1)
        ]
      );
      return getMovieBanner;
    };
    _fetchData();
  }, []);
  console.log(movie);

  let truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const myStyle = {
    backgroundSize: "cover",
    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
    backgroundPosition: "center center",
  };

  return (
    <header className="banner" style={myStyle}>
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner__fadeBottom"/>
    </header>
  );
};

export default Banner;
