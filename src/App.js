import React, { useState, useEffect } from "react";
// import config from "./config";
import Header from "./components/Header/Header";
import SearchSpells from "./components/SearchSpells/SearchSpells";
import ListSpells from "./components/ListSpells/ListSpells";
import { ReactComponent as Scroll } from "./components/Scroll/scroll.svg";
import { ReactComponent as CurseScroll } from "./components/Scroll/cursescroll.svg";
import "./App.scss";
import "./components/Scroll/Scroll.scss";

function App() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     spells: [],
  //     curses: [],
  //     noncurses: [],
  //     queryText: "",
  //     type: "",
  //     orderDir: "asc",
  //     restrictedSection: false,
  //     displayResults: false,
  //     filtered: false,
  //     error: null,
  //   };
  // }

  const [spells, setSpells] = useState([]);
  const [curses, setCurses] = useState([]);
  const [noncurses, setNoncurses] = useState([]);
  const [queryText, setQueryText] = useState("");
  const [type, setType] = useState("");
  const [orderDir, setOrderDir] = useState("asc");
  const [restrictedSection, setRestrictedSection] = useState(false);
  const [displayResults, setDisplayResults] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [error, setError] = useState(null);

  // handleError = (err) => {
  //   this.setState({ error: err });
  // };

  const splitSpells = (arr) => {
    let curses = arr.filter((spell) => {
      return spell["type"].includes("Curse");
    });
    let noncurses = arr.filter((spell) => {
      return !spell["type"].includes("Curse");
    });
    // this.setState({
    //   spells: noncurses,
    //   curses: curses,
    //   noncurses: noncurses,
    // });
    setSpells(noncurses);
    setCurses(curses);
    setNoncurses(noncurses);
  };

  // setResults = () => {
  //   this.setState({
  //     displayResults: true,
  //   });
  // };

  const clearResults = () => {
    // this.setState({
    //   displayResults: false,
    //   spells: this.state.noncurses,
    //   type: "",
    //   restrictedSection: false,
    //   filtered: false,
    //   queryText: "",
    // });
    setDisplayResults(false);
    setSpells(noncurses);
    setType("");
    setRestrictedSection(false);
    setFiltered(false);
    setQueryText("");
  };

  //useeffect
  useEffect(() => {
    // let url = `https://cors-anywhere.herokuapp.com/https://www.potterapi.com/v1/spells?key=${config.key}`;
    fetch("data.json", {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000/",
      },
    })
      .then((res) => res.json())
      .then((res) => splitSpells(res))
      .catch((err) => setError(err.error));
  });

  const searchSpells = (query) => {
    setQueryText(query);
    setDisplayResults(true);
  };

  const changeOrder = (dir) => {
    setOrderDir(dir);
  };

  const changeType = (type) => {
    setType(type);
  };

  const enterRestrictedSection = () => {
    setSpells(curses);
    setType("Curse");
    setRestrictedSection(true);
    setQueryText("");
    setDisplayResults(false);
  };

  const filterSpellsByType = (spells, type) => {
    let filteredByType = spells.filter((eachType) => {
      return eachType["type"] === type;
    });
    return filteredByType;
  };

  const handleFilter = (type, spells) => {
    changeType(type);
    let filteredByType = filterSpellsByType(spells, type);
    setFiltered(true);
    setSpells(filteredByType);
  };

  const removeFilter = () => {
    setFiltered(false);
    setSpells(noncurses);
  };

  // const {
  //   spells,
  //   curses,
  //   type,
  //   orderDir,
  //   queryText,
  //   displayResults,
  //   restrictedSection,
  //   filtered,
  //   error,
  // } = state;
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
    <div className="App">
      {error ? <p>Something went wrong. Please try again.</p> : ""}
      <Header id="header" />
      {restrictedSection ? (
        <CurseScroll className="CurseScroll" />
      ) : (
        <Scroll className="Scroll" />
      )}
      <SearchSpells
        searchSpells={searchSpells}
        changeType={changeType}
        changeOrder={changeOrder}
        orderDir={orderDir}
        spells={filteredSpells}
        handleFilter={handleFilter}
        removeFilter={removeFilter}
        displayResults={displayResults}
        setResults={() => setDisplayResults(true)}
        clearResults={clearResults}
        type={type}
        filtered={filtered}
        restrictedSection={restrictedSection}
        queryText={queryText}
      />

      {displayResults ? (
        <ListSpells
          spells={filteredSpells}
          filteredByTypeSpells={filteredSpells}
          curses={curses}
          enterRestrictedSection={enterRestrictedSection}
          searchSpells={searchSpells}
          type={type}
          restrictedSection={restrictedSection}
          clearResults={clearResults}
          changeOrder={changeOrder}
          handleFilter={handleFilter}
          filtered={filtered}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
