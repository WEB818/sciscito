import React, { Component } from "react";
import Spell from "./Spell";

export default class ListSpells extends Component {
  clearResults = () => {
    document.getElementById("search").value = "";
    this.props.searchSpells("");
    this.props.clearResults();
  };

  searchCurses = () => {
    return (
      <>
        <label htmlFor="search">What dost thou seek?</label>
        <input
          id="search"
          type="text"
          name="spell"
          onChange={(e) => this.props.searchSpells(e.target.value)}
        />
        <button onClick={(e) => this.props.changeOrder("spell", "asc")}>
          A - Z
        </button>
        <button onClick={(e) => this.props.changeOrder("spell", "desc")}>
          Z - A
        </button>
        <button onClick={this.props.clearResults}>
          Exit the Restricted Section
        </button>
      </>
    );
  };

  render() {
    const {
      spells,
      filteredByTypeSpells,
      enterRestrictedSection,
      restrictedSection,
      filtered,
    } = this.props;
    if (spells.length === 0 && !restrictedSection) {
      return (
        <>
          <p>
            There are no spells that match your search. Would you like to visit
            the Restricted Section?
          </p>
          <button onClick={enterRestrictedSection}>Search Curses</button>
        </>
      );
    } else if (!restrictedSection && !filtered) {
      return (
        <div>
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
    } else if (filtered && !restrictedSection) {
      return (
        <div>
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
        <>
          {this.searchCurses()}
          <div>
            {this.props.spells.map((spell) => (
              <Spell
                key={spell._id}
                name={spell.spell}
                effect={spell.effect}
                type={spell.type}
              />
            ))}
          </div>
        </>
      );
    }
  }
}
