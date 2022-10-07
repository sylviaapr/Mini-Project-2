import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { API_KEY } from "./Constants";
import "./Style.css";

function Home() {
  const [data, setData] = useState();
  const [watchList, setwatchList] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?api_key=74f4ffed4a687118b2e877081f050d22&language=en-US"
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/account/{account_id}/lists?api_key=${API_KEY}&session_id=${localStorage.getItem(
        "sessionID"
      )}`,
    })
      .then((response) => {
        setwatchList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddMovie = (listID, MovieID) => {
    axios({
      method: "post",
      url: `https://api.themoviedb.org/3/list/${listID}/add_item?api_key=${API_KEY}&session_id=${localStorage.getItem(
        "sessionID"
      )}`,
      data: {
        media_id: MovieID,
      },
    })
      .then((response) => {
        console.log(response);
        alert("Movie added successfully!");
      })
      .catch((error) => {
        console.log(error);
        alert("The movie already on your list!");
      });
  };
  const renderFooter = () => {
    if (localStorage.getItem("sessionID")) {
      return (
        <button
          type="button"
          className="btn button-style text-white dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Add to watch list
        </button>
      );
    }
  };

  return (
    <div>
      <Carousel />
      <div className="container-md">
        <hr className="bg-light lines-style mt-5 mb-5" />
      </div>
      <div className="container-md">
        <div className="row row-cols-1 row-cols-md-4 g-4 mb-4">
          {data &&
            data.results.map((r) => (
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
                    type="button"
                    className="btn text-white button-style"
                    data-bs-toggle="modal"
                    data-bs-target={`#staticBackdrop_${r.id}`}
                  >
                    Details & more
                  </button>
                </div>
                <div
                  className="modal fade"
                  id={`staticBackdrop_${r.id}`}
                  tabIndex="-1"
                  aria-labelledby="modal-title"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content text-white background-color">
                      <img
                        src={`https://image.tmdb.org/t/p/original${r.backdrop_path}`}
                        className="card-img-top rounded"
                        alt={r.title}
                      ></img>
                      <div className="modal-body">
                        <h5 className="modal-title">{r.title}</h5>
                        <p>ID: {r.id}</p>
                        <p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-stars"
                            viewBox="0 0 16 16"
                          >
                            <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                          </svg>
                          Popularity: {r.popularity}
                        </p>
                        <p>{r.overview}</p>
                      </div>
                      <div className="modal-footer">
                        {renderFooter()}
                        <ul className="dropdown-menu button-style">
                          {watchList &&
                            watchList.results.map((item) => (
                              <li key={item.id}>
                                <a
                                  className="dropdown-item text-white"
                                  href="#"
                                  onClick={() => handleAddMovie(item.id, r.id)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-plus-lg"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                                    />
                                  </svg>
                                  {item.name}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
