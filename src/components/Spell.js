import React from "react";

export default function Spell(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <div>{props.effect}</div>
      <div>{props.type}</div>
    </div>
  );
}
