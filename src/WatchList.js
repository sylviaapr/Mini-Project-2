import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { API_KEY } from "./Constants";
import axios from "axios";

const WatchList = () => {
  const [data, setData] = useState();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: (values) => {
      if (localStorage.getItem("sessionID")) {
        axios({
          method: "post",
          url: `https://api.themoviedb.org/3/list?api_key=${API_KEY}&session_id=${localStorage.getItem(
            "sessionID"
          )}`,
          data: {
            name: values.name,
            description: values.description,
          },
        })
          .then((response) => {
            alert("List created successfully");
            axios({
              method: "get",
              url: `https://api.themoviedb.org/3/account/{account_id}/lists?api_key=${API_KEY}&session_id=${localStorage.getItem(
                "sessionID"
              )}`,
            })
              .then((response) => {
                setData(response.data);
                values.name = "";
                values.description = "";
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  });

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/account/{account_id}/lists?api_key=${API_KEY}&session_id=${localStorage.getItem(
        "sessionID"
      )}`,
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteList = (id) => {
    axios({
      method: "delete",
      url: `https://api.themoviedb.org/3/list/${id}?api_key=${API_KEY}&session_id=${localStorage.getItem(
        "sessionID"
      )}`,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert("List deleted successfully!");
        let filtered = data.results.filter((item) => item.id !== id);
        setData((current) => {
          return {
            ...current,
            results: filtered,
          };
        });
      });
  };

  return (
    <>
      <div className="container-md my-3 text-white">
        <div className="text-center">
          <h2>Create a watch list</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name">List Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="form-control"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="description">List Description</label>
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  className="form-control"
                  cols="30"
                  rows="7"
                />
                {formik.touched.description && formik.errors.description ? (
                  <div>{formik.errors.description}</div>
                ) : null}
              </div>
              <div className="text-center">
                <button type="submit" className="btn button-style text-white">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container-md">
        <hr className="bg-light lines-style mt-5 mb-5" />
      </div>
      <div className="container-md">
        <div className="row row-cols-1 row-cols-md-4 g-4 mt-4 mb-4">
          {data &&
            data.results.map((r) => {
              return (
                <div
                  key={r.id}
                  className="card text-center text-white background-color shadow-style card-style"
                >
                  <div className="card-body">
                    <h5 className="card-title">{r.name}</h5>
                    <p>{r.id}</p>
                    <p className="card-text">{r.description}</p>
                    <div className="text-center">
                      <a
                        href={`/movielisted/${r.id}`}
                        className="btn button-style text-white mx-2"
                      >
                        Details & More
                      </a>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a
                        href="#"
                        className="btn button-style text-white mx-2"
                        onClick={() => handleDeleteList(r.id)}
                      >
                        Delete List
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default WatchList;
