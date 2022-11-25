import React, { Component } from "react";

class Search extends Component {
  render() {
    return <>
      <nav>
        <div>
          <h1>Clima</h1>
          <small>Veja como está o clima em sua cidade.</small>
          <div className="search">
            <input onChange={this.props.onChange} type="text" placeholder="busque uma cidade" value={this.props.city} />
            <button id="btn" onClick={this.props.handleSarch}><span className="material-symbols-rounded"> search </span></button>
          </div>
        </div>
      </nav>
    </>
  }
}


export default Search;