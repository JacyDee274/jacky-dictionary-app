import React, { useState } from "react";
import axios from "axios";
import Results from "./Results.js";
import Photos from "./Photos";

import "./Dictionary.css";

export default function Dictionary(props) {
  let [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [photos, setPhotos] = useState(null);

  function handleResponse(response) {
    setResults(response.data);
    setPhotos(response.data.photos);
  }

  function handlePictureResponse(response) {
    console.log(response.data);
  }
  function search() {
    let apiKey = "c2dtd96d439e4038fe94409oc4ab6feb";
    let apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;
    axios.get(apiUrl).then(handleResponse);

    let pictureApiKey = "c2dtd96d439e4038fe94409oc4ab6feb";
    let pictureApiUrl = `https://api.shecodes.io/images/v1/search?query=${keyword}&key=${pictureApiKey}`;
    axios.get(pictureApiUrl).then(handlePictureResponse);
  }
  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  function load() {
    setLoaded(true);
    search();
  }

  if (loaded) {
    return (
      <div className="Dictionary">
        <section>
          <h1>What word do you want to look up?</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              onChange={handleKeywordChange}
              defaultValue={props.defaultKeyword}
            ></input>
          </form>
          <div className="hint">
            Suggested Words: Sunset, Sunrise, Wine, Yoga...{" "}
          </div>
        </section>
        <Results results={results} />
        <Photos photos={photos} />
      </div>
    );
  } else {
    load();
    return "Loading";
  }
}
