import React from "react";
import Spell from "../Spell/Spell";
import "./ListSpells.scss";

export default function ListSpells(props) {
  const cursesList = () => {
    if (props.spells.length === 0) {
      return (
        <div className="ListSpells__container">
          <p className="no-curses-message">
            There are no curses that match your search.
          </p>
          <button className="curse-button" onClick={props.clearResults}>
            Exit
          </button>
        </div>
      );
    } else if (!props.filtered) {
      return (
        <div className="ListCurses">
          {props.spells.map((spell) => (
            <Spell
              key={spell._id}
              name={spell.spell}
              effect={spell.effect}
              type={spell.type}
            />
          ))}
        </div>
      );
    } else if (props.filtered) {
      return (
        <div className="ListCurses">
          {props.filteredByTypeSpells.map((spell) => (
            <Spell
              key={spell._id}
              name={spell.spell}
              effect={spell.effect}
              type={spell.type}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div className="ListCurses">
          {props.spells.map((spell) => (
            <Spell
              key={spell._id}
              name={spell.spell}
              effect={spell.effect}
              type={spell.type}
            />
          ))}
        </div>
      );
    }
  };

  const spellsList = () => {
    if (props.spells.length === 0) {
      return (
        <div className="ListSpells__container">
          <p className="restricted-message">
            There are no spells that match your search. Would you like to visit
            the Restricted Section?
          </p>
          <button
            className="curse-button"
            onClick={props.enterRestrictedSection}
          >
            Search Curses
          </button>
        </div>
      );
    } else if (!props.filtered) {
      return (
        <div className="ListSpells">
          {props.spells.map((spell) => (
            <Spell
              key={spell._id}
              name={spell.spell}
              effect={spell.effect}
              type={spell.type}
            />
          ))}
        </div>
      );
    } else if (props.filtered) {
      return (
        <div className="ListSpells">
          {props.filteredByTypeSpells.map((spell) => (
            <Spell
              key={spell._id}
              name={spell.spell}
              effect={spell.effect}
              type={spell.type}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div className="ListSpells">
          {props.spells.map((spell) => (
            <Spell
              key={spell._id}
              name={spell.spell}
              effect={spell.effect}
              type={spell.type}
            />
          ))}
        </div>
      );
    }
  };

  return <>{!props.restrictedSection ? spellsList() : cursesList()}</>;
}
