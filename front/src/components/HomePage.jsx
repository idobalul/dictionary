import React from "react";
import { useRef } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Notyf } from "notyf";
import "../App.css";

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

export default function HomePage() {
  const navigate = useNavigate();
  const wordInput = useRef();
  const posInput = useRef();
  const posInput2 = useRef();
  const letterInput = useRef();

  function normalSearch() {
    const word = wordInput.current.value;
    const pos = posInput.current.value;
    if (!word) {
      notyf.error("word must have a value");
      return;
    }
    if (pos) {
      navigate(`/${word}/${pos}`);
    } else {
      navigate(`/${word}`);
    }
  }

  function randomSearch() {
    const pos = posInput2.current.value;
    const letter = letterInput.current.value;
    if (!pos) {
      notyf.error("part of speech must have a value");
      return;
    }
    if (letter) {
      navigate(`/part-of-speech/${pos}`, { state: { letter } });
    } else {
      navigate(`/part-of-speech/${pos}`);
    }
  }

  return (
    <div className="home-page">
      <h1 className="mb-5">Dictionary</h1>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Search by word</InputGroup.Text>
        <FormControl
          ref={wordInput}
          placeholder="Word"
          aria-label="Word"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Part of speech</InputGroup.Text>
        <FormControl
          ref={posInput}
          placeholder="Part of speech"
          aria-label="POS"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <Button className="mb-5" variant="primary" onClick={normalSearch}>
        Normal Search
      </Button>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Random by Part of speech</InputGroup.Text>
        <FormControl ref={posInput2} placeholder="Part of speech" aria-describedby="basic-addon1" />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Random with specific letter</InputGroup.Text>
        <FormControl
          ref={letterInput}
          placeholder="Letter"
          aria-label="letter"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <Button variant="primary" onClick={randomSearch}>
        Random Search
      </Button>
    </div>
  );
}
