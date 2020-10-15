import React, { Component } from "react";
import config from "./config";

import SearchSpells from "./components/SearchSpells";
import ListSpells from "./components/ListSpells";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spells: [],
      curses: [],
      noncurses: [],
      queryText: "",
      orderDir: "asc",
      type: "",
      restrictedSection: false,
      displayResults: false,
      filtered: false,
      filteredTypes: [],
      error: null,
    };
  }
  handleError = (err) => {
    this.setState({ error: err });
  };

  splitSpells = (arr) => {
    let curses = arr.filter((spell) => {
      return spell["type"].includes("Curse");
    });
    let noncurses = arr.filter((spell) => {
      return !spell["type"].includes("Curse");
    });
    this.setState({
      spells: noncurses,
      curses: curses,
      noncurses: noncurses,
    });
  };

  setResults = () => {
    this.setState({
      displayResults: true,
    });
  };

  clearResults = () => {
    this.setState({
      displayResults: false,
      spells: this.state.noncurses,
      type: "",
      restrictedSection: false,
      filtered: false,
    });
  };

  componentDidMount() {
    let url = `https://www.potterapi.com/v1/spells?key=${config.key}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => this.splitSpells(res))
      .catch((err) => this.handleError(err.error));
  }

  searchSpells = (query) => {
    this.setState({ queryText: query, displayResults: true });
  };

  changeOrder = (dir) => {
    this.setState({
      orderDir: dir,
    });
  };

  changeType = (type) => {
    this.setState({
      type: type,
    });
  };

  enterRestrictedSection = () => {
    this.setState({
      spells: this.state.curses,
      type: "Curse",
      restrictedSection: true,
    });
  };

  filterSpellsByType = (spells, type) => {
    let filteredByType = spells.filter((eachType) => {
      return eachType["type"] === type;
    });
    return filteredByType;
  };

  handleFilter = (type, spells) => {
    this.changeType(type);
    let filteredByType = this.filterSpellsByType(spells, type);
    this.setState({
      filtered: true,
      filteredTypes: filteredByType,
    });
  };

  removeFilter = () => {
    this.setState({
      filtered: false,
    });
  };
  render() {
    const {
      spells,
      curses,
      type,
      orderDir,
      queryText,
      displayResults,
      restrictedSection,
      filtered,
      filteredTypes,
      error,
    } = this.state;
    let order;

    let filteredSpells = spells;

    if (orderDir === "asc") {
      order = 1;
    } else {
      order = -1;
    }

    filteredSpells = filteredSpells
      .sort((a, b) => {
        if (a["spell"].toLowerCase() < b["spell"].toLowerCase()) {
          return -1 * order;
        } else {
          return 1 * order;
        }
      })
      .filter((eachSpell) => {
        return eachSpell["effect"]
          .toLowerCase()
          .includes(queryText.toLowerCase());
      });

    return (
      <div>
        {error ? <p>Something went wrong. Please try again.</p> : ""}
        <SearchSpells
          searchSpells={this.searchSpells}
          changeType={this.changeType}
          changeOrder={this.changeOrder}
          orderDir={orderDir}
          spells={filteredSpells}
          handleFilter={this.handleFilter}
          removeFilter={this.removeFilter}
          displayResults={displayResults}
          setResults={this.setResults}
          clearResults={this.clearResults}
          type={type}
          filtered={filtered}
          restrictedSection={restrictedSection}
        />
        {displayResults ? (
          <ListSpells
            spells={filteredSpells}
            filteredByTypeSpells={filteredTypes}
            curses={curses}
            enterRestrictedSection={this.enterRestrictedSection}
            searchSpells={this.searchSpells}
            type={type}
            restrictedSection={restrictedSection}
            clearResults={this.clearResults}
            changeOrder={this.changeOrder}
            handleFilter={this.handleFilter}
            filtered={filtered}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default App;