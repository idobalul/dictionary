/* eslint-disable no-unused-expressions */
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Notyf } from "notyf";

const notyf = new Notyf({
  duration: 5000,
  position: {
    x: "right",
    y: "top",
  },
  types: [
    {
      type: "error",
      background: "indianred",
      dismissible: true,
    },
  ],
});

export default function WordPage() {
  const navigate = useNavigate();
  const { word, pos } = useParams();
  const [data, setData] = useState();

  const search = async () => {
    try {
      let response;
      if (pos) {
        response = await axios.get(`/${word}/${pos}`);
      } else {
        response = await axios.get(`/${word}`);
      }
      setData(response.data);
    } catch (error) {
      console.log(error.response);
      notyf.error(error.response.data);
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="main">
      <Button
        className="mb-3"
        variant="primary"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </Button>
      {data &&
        data.map((value) => {
          return (
            <div className="word">
              <h2>
                <span>{value.word}</span>{" "}
                <span
                  className="pos"
                  onClick={(event) => {
                    navigate(`/part-of-speech/${event.target.innerText}`);
                  }}
                >
                  {value.pos}
                </span>
              </h2>
              {value.definitions.map((def) => {
                return <p className="definition">{def}</p>;
              })}
            </div>
          );
        })}
    </div>
  );
}
