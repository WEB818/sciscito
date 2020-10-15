import React, { Component } from "react";
import { countType } from "../helpers";
import Spell from "../components/Spell";
import "./SearchSpells.css";

export default class SearchSpells extends Component {
  displayFilteredTypes = (spells) => {
    console.log("did not work");
    return <Spell name="worked!" />;
  };
  handleClick = (type, spells) => {
    this.props.changeType(type);
    let spellsByType = this.props.spellsByType(spells, type);
    this.setState({
      filtered: true,
    });
    this.displayFilteredTypes(spellsByType);
  };

  displayTypes = (obj) => {
    return obj.map((type, idx) => {
      if (type["count"] > 0) {
        return (
          <button
            key={idx}
            onClick={() =>
              this.props.handleFilter(type["type"], this.props.spells)
            }
          >
            <p>
              {type["type"]} <span className="blob">{type["count"]}</span>
            </p>
          </button>
        );
      } else {
        return (
          <div className="disappear" key={idx}>
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
      { icon: "spell", type: "Spell" },
      { icon: "charm", type: "Charm" },
      { icon: "ench", type: "Enchantment" },
      { icon: "jinx", type: "Jinx" },
      { icon: "hex", type: "Hex" },
    ];
    let typeObj = typeArr.map((type) => {
      if (this.props.displayResults) {
        return {
          icon: type.icon,
          type: type.type,
          count: this.countByType(type["type"]),
        };
      } else {
        return "";
      }
    });

    let results = this.displayTypes(typeObj);

    return (
      <>
        <div className="type">{results}</div>
        {this.props.filtered && (
          <button onClick={this.props.removeFilter}>Reveal All</button>
        )}
        {!this.props.restrictedSection && (
          <div>
            <label htmlFor="search">What dost thou seek?</label>
            <input
              id="search"
              type="text"
              name="spell"
              onChange={(e) => this.props.searchSpells(e.target.value)}
            />
            {!this.props.filtered && (
              <>
                <button onClick={(e) => this.props.changeOrder("asc")}>
                  A - Z
                </button>
                <button onClick={(e) => this.props.changeOrder("desc")}>
                  Z - A
                </button>
                <button
                  onClick={() => this.clearResults(this.props.clearResults)}
                >
                  Clear Results
                </button>
              </>
            )}
          </div>
        )}
      </>
    );
  }
}
