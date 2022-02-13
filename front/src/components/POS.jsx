import axios from "axios";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Notyf } from "notyf";

const BASE_URL = "https://acukr0ygs7.execute-api.eu-central-1.amazonaws.com";

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

export default function POS() {
  const navigate = useNavigate();
  const { pos } = useParams();
  const { state } = useLocation();
  const [data, setData] = useState();

  const search = async () => {
    try {
      let response;
      if (state) {
        const { letter } = state;
        response = await axios.get(`${BASE_URL}/part-of-speech/${pos}?letter=${letter}`);
      } else {
        response = await axios.get(`${BASE_URL}/part-of-speech/${pos}`);
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
      {data && (
        <div className="word">
          <h2>
            <span>{data.word}</span> <span className="pos">{data.pos}</span>
          </h2>
          {data.definitions.map((def) => {
            return <p className="definition">{def}</p>;
          })}
        </div>
      )}
    </div>
  );
}
