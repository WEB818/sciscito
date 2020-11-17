import React, { Component } from "react";

import Spell from "./Spell";

import "./ListSpells.scss";
export default class ListSpells extends Component {
  clearResults = () => {
    document.getElementById("search").value = "";
    this.props.searchSpells("");
    this.props.clearResults();
  };

  cursesList = () => {
    if (this.props.spells.length === 0) {
      return (
        <div className="ListSpells__container">
          <p className="no-curses-message">
            There are no curses that match your search.
          </p>
          <button className="curse-button" onClick={this.props.clearResults}>
            Exit
          </button>
        </div>
      );
    } else if (!this.props.filtered) {
      return (
        <div className="ListCurses">
          {this.props.spells.map((spell) => (
            <Spell
              key={spell._id}
              name={spell.spell}
              effect={spell.effect}
              type={spell.type}
            />
          ))}
        </div>
      );
    } else if (this.props.filtered) {
      return (
        <div className="ListCurses">
          {this.props.filteredByTypeSpells.map((spell) => (
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
          {this.props.spells.map((spell) => (
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

  spellsList = () => {
    if (this.props.spells.length === 0) {
      return (
        <div className="ListSpells__container">
          <p className="restricted-message">
            There are no spells that match your search. Would you like to visit
            the Restricted Section?
          </p>
          <button
            className="curse-button"
            onClick={this.props.enterRestrictedSection}
          >
            Search Curses
          </button>
        </div>
      );
    } else if (!this.props.filtered) {
      return (
        <div className="ListSpells">
          {this.props.spells.map((spell) => (
            <Spell
              key={spell._id}
              name={spell.spell}
              effect={spell.effect}
              type={spell.type}
            />
          ))}
        </div>
      );
    } else if (this.props.filtered) {
      return (
        <div className="ListSpells">
          {this.props.filteredByTypeSpells.map((spell) => (
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
          {this.props.spells.map((spell) => (
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

  render() {
    return (
      <>
        {!this.props.restrictedSection ? this.spellsList() : this.cursesList()}
      </>
    );
  }
}
