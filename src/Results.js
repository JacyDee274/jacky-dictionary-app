import React from "react";
import Meaning from "./Meaning.js";
import "./Results.css";

export default function Result(props) {
  if (props.results) {
    return (
      <div className="Results">
        <section>
          <h2>{props.results.word}</h2>
          <h3>{props.results.phonetic}</h3>
          </section>
          <p>
            {props.results.meanings.map(function (meaning, index) {
              return (
                <section key={index}>
                  <Meaning meaning={meaning} />
                </section>
              );
            })}
          </p>
      </div>
    );
  } else {
    return null;
  }
}
