import React, { Component } from "react";
import { countType } from "../helpers";

import "./SearchSpells.scss";

export default class SearchSpells extends Component {
  handleClick = (type, spells) => {
    this.props.changeType(type);
    this.props.spellsByType(spells, type);
    this.setState({
      filtered: true,
    });
  };

  displayTypes = (obj) => {
    return obj.map((type, idx) => {
      if (type["count"] > 0) {
        return (
          <button
            key={idx}
            className="spell-type"
            onClick={() =>
              this.props.handleFilter(type["type"], this.props.spells)
            }
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

  countByType = (type) => {
    return countType(this.props.spells, type);
  };

  clearResults = () => {
    document.getElementById("search").value = "";
    this.props.searchSpells("");
    this.props.clearResults();
  };

  render() {
    const typeArr = [
      { type: "Spell" },
      { type: "Charm" },
      { type: "Enchantment" },
      { type: "Jinx" },
      { type: "Hex" },
    ];
    let typeObj = typeArr.map((type) => {
      if (this.props.displayResults) {
        return {
          type: type.type,
          count: this.countByType(type["type"]),
        };
      } else {
        return "";
      }
    });

    let results = this.displayTypes(typeObj);

    return (
      <div className="SearchSpells">
        <div className="SearchSpells__types">{results}</div>
        {this.props.filtered && (
          <button className="reveal" onClick={this.props.removeFilter}>
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
              value={this.props.queryText}
              onChange={(e) => this.props.searchSpells(e.target.value)}
            />
            {this.props.displayResults && (
              <div className="SearchSpells__filters">
                {this.props.spells.length > 0 && !this.props.restrictedSection && (
                  <>
                    <button
                      className="filter-options"
                      onClick={(e) => this.props.changeOrder("asc")}
                    >
                      A - Z
                    </button>
                    <button
                      className="filter-options"
                      onClick={(e) => this.props.changeOrder("desc")}
                    >
                      Z - A
                    </button>
                  </>
                )}
                {this.props.spells.length > 0 && this.props.restrictedSection && (
                  <>
                    <button
                      className="curse-filter-options"
                      onClick={(e) => this.props.changeOrder("asc")}
                    >
                      A - Z
                    </button>
                    <button
                      className="curse-filter-options"
                      onClick={(e) => this.props.changeOrder("desc")}
                    >
                      Z - A
                    </button>
                  </>
                )}
                {!this.props.restrictedSection && (
                  <button
                    className="filter-options"
                    onClick={() => this.clearResults(this.props.clearResults)}
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
  }
}
