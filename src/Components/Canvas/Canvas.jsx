import React, { Component } from 'react';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  handleDoubleClick(event) {
    const { clientX, clientY } = event;
    this
  }

  render() {
    return (
      <svg onDoubleClick={this.handleDoubleClick} height="100%" width="100%">
        <rect height="50" width="100" x="50" y="100" fill="yellowgreen" />
      </svg>
    );
  }
}

export default Canvas;
