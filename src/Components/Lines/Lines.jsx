import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Lines extends Component {
  constructor(props) {
    super(props);

    this.handleRemoveLine = this.handleRemoveLine.bind(this);
  }

  handleRemoveLine(event) {
    if (event.ctrlKey) {
      const { removeLine, removeConnection, rectangles } = this.props;
      const lineId = event.target.getAttribute('data-key');
      rectangles.forEach((rect) => {
        rect.connections.forEach((con) => {
          if (con.lineId === lineId) {
            removeConnection(rect.id, lineId);
          }
        });
      });
      removeLine(lineId);
    }
  }

  render() {
    const { lines } = this.props;
    return (
      Array.isArray(lines) ? lines.map(line => (
        <line
          onMouseDown={this.handleRemoveLine}
          key={line.id}
          data-key={line.id}
          x1={line.startPoint.x}
          y1={line.startPoint.y}
          x2={line.endPoint.x}
          y2={line.endPoint.y}
          stroke="purple"
          strokeWidth="5"
        />
      )) : ''
    );
  }
}

Lines.propTypes = {
  lines: PropTypes.array.isRequired,
  rectangles: PropTypes.array.isRequired,
  removeLine: PropTypes.func.isRequired,
  removeConnection: PropTypes.func.isRequired,

};

export default Lines;
