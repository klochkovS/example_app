import React, { Component } from 'react';

class Lines extends Component {
  render() {
    const { lines } = this.props;
    return (
      Array.isArray(lines) ? lines.map(line => (
        <line
          key={line.id}
          data-key={line.id}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="black"
        />
      )) : ''
    );
  }
}

export default Lines;
