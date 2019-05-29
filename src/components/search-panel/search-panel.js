import React, { Component } from 'react'
import './search-panel.css'

export default class SearchPanel extends Component {
  state = {
    searchText: 'Type here to search',
    term: ''
  };

  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({
      term
    });
    this.props.onSearchChange(term);
  };

  render() {
    return (
      <input
        type="text"
        placeholder={this.state.searchText}
        value={this.state.term}
        onChange={this.onSearchChange}
      />
    )
  }
};

