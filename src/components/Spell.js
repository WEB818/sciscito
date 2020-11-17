import React from "react";

import "./Spell.scss";

export default function Spell(props) {
  return (
    <div id="Spell" className="Spell">
      <h2>{props.name}</h2>
      <h5>Classification: {props.type}</h5>
      <p>{props.effect}</p>
    </div>
  );
}
