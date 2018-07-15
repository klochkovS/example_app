import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Lines extends Component {
  render() {
    const { lines } = this.props;
    return (
      Array.isArray(lines) ? lines.map(line => (
        <line
          key={line.id}
          data-key={line.id}
          x1={line.startPoint.x}
          y1={line.startPoint.y}
          x2={line.endPoint.x}
          y2={line.endPoint.y}
          stroke="black"
        />
      )) : ''
    );
  }
}

Lines.propTypes = {
  lines: PropTypes.array.isRequired,
};

export default Lines;
