import React, { useRef } from "react";
import { countType } from "../../helpers";

import "./SearchSpells.scss";

const SearchSpells = (props) => {
  const displayTypes = (obj) => {
    return obj.map((type, idx) => {
      if (type["count"] > 0) {
        return (
          <button
            key={idx}
            className="spell-type"
            onClick={() => props.handleFilter(type["type"], props.spells)}
          >
            <p className="blob">{type["count"]}</p>
            {type["type"]}
          </button>
        );
      } else {
        return (
          <div className="spell-type__disappear" key={idx}>
            <p>{type["type"]}</p>
          </div>
        );
      }
    });
  };

  const countByType = (type) => {
    return countType(props.spells, type);
  };

  const clearResults = () => {
    document.getElementById("search").value = "";
    props.searchSpells("");
    props.clearResults();
  };

  const typeArr = [
    { type: "Spell" },
    { type: "Charm" },
    { type: "Enchantment" },
    { type: "Jinx" },
    { type: "Hex" },
  ];
  let typeObj = typeArr.map((type) => {
    if (props.displayResults) {
      return {
        type: type.type,
        count: countByType(type["type"]),
      };
    } else {
      return "";
    }
  });

  let results = displayTypes(typeObj);

  return (
    <div className="SearchSpells">
      <div className="SearchSpells__types">{results}</div>
      {props.filtered && (
        <button className="reveal" onClick={props.removeFilter}>
          Reveal All
        </button>
      )}

      <div className="SearchSpells__container">
        <div className="SearchSpells__search">
          <input
            id="search"
            className="search"
            type="text"
            name="spell"
            placeholder="What dost thou seek?"
            value={props.queryText}
            onChange={(e) => props.searchSpells(e.target.value)}
          />
          {props.displayResults && (
            <div className="SearchSpells__filters">
              {props.spells.length > 0 && !props.restrictedSection && (
                <>
                  <button
                    className="filter-options"
                    onClick={(e) => props.changeOrder("asc")}
                  >
                    A - Z
                  </button>
                  <button
                    className="filter-options"
                    onClick={(e) => props.changeOrder("desc")}
                  >
                    Z - A
                  </button>
                </>
              )}
              {props.spells.length > 0 && props.restrictedSection && (
                <>
                  <button
                    className="curse-filter-options"
                    onClick={(e) => props.changeOrder("asc")}
                  >
                    A - Z
                  </button>
                  <button
                    className="curse-filter-options"
                    onClick={(e) => props.changeOrder("desc")}
                  >
                    Z - A
                  </button>
                </>
              )}
              {!props.restrictedSection && (
                <button
                  className="filter-options"
                  onClick={() => clearResults(props.clearResults)}
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SearchSpells;
