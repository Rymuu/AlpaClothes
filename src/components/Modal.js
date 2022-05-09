import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Movie from "./Slider/SimilarMoviesCard";
import movieService from "../services/movie.service";
import CategoryTitle from "./CategoryTitle";

const Index = (props) => {
  const notifyAdd = () => toast.success(`${movie?.title || movie?.name || movie?.original_title} a bien été ajouté dans ta watchlist !`);
  const notifyDelete = () => toast.success(`${movie?.title || movie?.name || movie?.original_title} a bien été retiré de ta watchlist !`);
  const { bannerStyle, movie, popUp, popUpStatut } = props
  const router = useRouter();
  // const [movie, setMovie] = useState();
  const [watchlist, setWatchlist] = useState(typeof window !== "undefined" ? JSON.parse(localStorage.getItem("mylist")) : []);
  const [similarMovies, setSimilarMovies] = useState()

  useEffect(() => {

    movieService.getSimilarMovies(movie.id)
      .then((data) => {
        setSimilarMovies(data.results);
        console.log(data.results);
      })
      .catch(err => console.log(err))
  }, []);

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString('fr-FR', {
      year: "numeric",
      month: "long",
      day: "numeric",
      //hour:"numeric",
      //minute:"numeric",
      //second:"numeric"

    })
    return newDate;
  }

  const deleteMovie = (movie) => {
    notifyDelete();
    const filteredList = watchlist.filter((item) => item.id !== movie.id);
    localStorage.setItem("mylist", JSON.stringify(filteredList));
    setWatchlist(filteredList);
  };
  const addTowatchlist = (element) => {
    //On créé un nouvel object avec une nouvelle propriété quantity
    notifyAdd();
    let movieToInsert = {
      id: element.id,
      title: element.title,
      backdrop_path: element.backdrop_path,
      overview: element.overview,
      quantity: 1
    };




    const watchlistArray = [];

    //Si j'ai déjà un ou des produits dans mon localstorage
    if (localStorage.getItem("mylist")) {

      const localStorageMyList = JSON.parse(localStorage.getItem("mylist"));
      localStorageMyList.forEach((movie) => {
        watchlistArray.push(movie);
      });

      const indexOfExistingMovie = watchlistArray.findIndex((el) => el.id === element.id);

      if (indexOfExistingMovie !== -1) {
      }
      else {
        watchlistArray.push(movieToInsert);
      }
      localStorage.setItem("mylist", JSON.stringify(watchlistArray));
    }
    //Si localstorage vide
    else {
      watchlistArray.push(movieToInsert);
      localStorage.setItem("mylist", JSON.stringify(watchlistArray));
    }



  };

  return (
    <>
    {popUpStatut ?
    <a className="quickView__close" onClick={popUp}>
    <div className="opacity__modal"></div>
    </a>
    :
    null
  }
      <div className={`quickView ${popUpStatut && "open"}`} >   
      
        <div className="quickView__banner" style={bannerStyle} >

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          <div className="modal__buttons">
            <button className="banner__button" onClick={() => { router.push(`/browse/${movie.id}`) }}>
              <PlayArrowRoundedIcon /> Lecture
            </button>
            <a className="quickView__add" onClick={() => addTowatchlist(movie)}>
              <AddCircleRoundedIcon fontSize="large" />
            </a>
            <a className="quickView__add" onClick={() => deleteMovie(movie)}>
              <RemoveCircleOutlineRoundedIcon fontSize="large" />
            </a>
          </div>

          <div className="quickView__content">
            <h3 className="quickView__title">
              {movie?.title || movie?.name || movie?.original_title}
            </h3>
            <h3 style={{ color: "rgba(120,120,120,3)" }}>
              Publié le : {dateParser(movie?.release_date)}
            </h3>
            <p style={{ textAlign: "justify" }}>
              {movie?.overview}
            </p>
          </div>
          <a className="quickView__close" onClick={popUp}>
            <CloseRoundedIcon />
          </a>
          <CategoryTitle title="Titres similaires" />
          <div className="grid">
            {similarMovies && similarMovies.map((movie) => { return <Movie movie={movie} /> })}
          </div>
        </div>

      </div>
    </>



  );
};

export default Index;