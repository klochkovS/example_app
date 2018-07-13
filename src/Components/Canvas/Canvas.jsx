import React, { Component } from 'react';
import PropTypes from 'prop-types';

import checkSpace from '../../lib/checkSpace';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: '',
    }
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleDoubleClick(event) {
    const { rectangles, addRect } = this.props;
    let { clientX, clientY } = event;
    clientX -= 50;
    clientY -= 25;
    if (checkSpace(rectangles, clientX, clientY)) {
      addRect(clientX, clientY);
    } else {
      alert('Не поместится');
    }
  }

  handleMouseDown(event) {
    const currentId = event.target.getAttribute('data-key');
    document.addEventListener('mousemove', this.handleMouseMove);
    this.setState({ currentId });
  }

  handleMouseMove(event) {
    const { currentId } = this.state;
    const { changeCoord } = this.props;
    let { clientX, clientY } = event;
    clientX -= 50;
    clientY -= 25;
    changeCoord(currentId, clientX, clientY);
  }

  handleMouseUp() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.setState({ currentId: '' });
  }

  render() {
    const { rectangles } = this.props;
    return (
      <svg onDoubleClick={this.handleDoubleClick} height="100%" width="100%">
        {Array.isArray(rectangles) ? rectangles.map(rect => (
          <rect
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            key={rect.id}
            data-key={rect.id}
            height="50"
            width="100"
            x={rect.x}
            y={rect.y}
            fill="yellowgreen"
          />
        )) : ''}
      </svg>
    );
  }
}

Canvas.propTypes = {
  addRect: PropTypes.func.isRequired,
  changeCoord: PropTypes.func.isRequired,
  rectangles: PropTypes.array,
};

export default Canvas;
