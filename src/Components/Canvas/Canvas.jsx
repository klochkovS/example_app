import React, { Component } from 'react';
import PropTypes from 'prop-types';
import checkSpace from '../../lib/checkSpace';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  handleDoubleClick(event) {
    const { rectangles, addRect } = this.props;
    let { clientX, clientY } = event;
    clientX -= 50;
    clientY -= 25;
    console.log('Сраблтал 2клик');
    console.log(rectangles);
    if (checkSpace(rectangles, clientX, clientY)) {
      addRect(clientX, clientY);
    } else {
      alert('Не поместится');
    }
  }

  render() {
    const { rectangles } = this.props;
    return (
      <svg onDoubleClick={this.handleDoubleClick} height="100%" width="100%">
        {Array.isArray(rectangles) ? rectangles.map(rect => (
          <rect height="50" width="100" x={rect.x} y={rect.y} fill="yellowgreen" />
        )) : ''}
        <rect height="50" width="100" x="50" y="100" fill="yellowgreen" />
      </svg>
    );
  }
}

Canvas.propTypes = {
  addRect: PropTypes.func.isRequired,
  rectangles: PropTypes.object,
};

export default Canvas;
