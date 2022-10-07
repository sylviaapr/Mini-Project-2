import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_KEY } from "./Constants";

const MovieList = () => {
  let { listID } = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/list/${listID}?api_key=${API_KEY}`,
    })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [listID]);

  const handleDeleteMovie = (id) => {
    axios({
      method: "post",
      url: `https://api.themoviedb.org/3/list/${listID}/remove_item?api_key=${API_KEY}&session_id=${localStorage.getItem(
        "sessionID"
      )}`,
      data: {
        media_id: id,
      },
    })
      .then((response) => {
        console.log(response);
        alert("Movie deleted successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="container-md">
        <div className="row row-cols-1 row-cols-md-4 g-4 mt-4 mb-4">
          {data &&
            data.items.map((r) => {
              return (
                <div
                  key={r.id}
                  className="card text-center text-white background-color shadow-style card-style"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${r.backdrop_path}`}
                    className="card-img-top rounded"
                    alt={r.title}
                  ></img>
                  <div className="card-body">
                    <button
                      className="btn button-style text-white"
                      onClick={() => handleDeleteMovie(r.id)}
                    >
                      Delete Movie
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default MovieList;
