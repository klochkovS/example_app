import React, { Component } from 'react';
import PropTypes from 'prop-types';
import checkSpaceInDrag from '../../lib/checkSpaceInDrag';

class RectList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: '',
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseDown(event) {
    const currentId = event.target.getAttribute('data-key');
    document.addEventListener('mousemove', this.handleMouseMove);
    this.setState({ currentId });
  }

  handleMouseMove(event) {
    const { currentId } = this.state;
    const { rectangles, changeCoord } = this.props;
    let { clientX, clientY } = event;
    clientX -= 50;
    clientY -= 25;

    const coord = checkSpaceInDrag(rectangles, currentId, clientX, clientY);
    changeCoord(currentId, coord.x, coord.y);
  }

  handleMouseUp() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.setState({ currentId: '' });
  }

  render() {
    const { rectangles } = this.props;
    return (
      Array.isArray(rectangles) ? rectangles.map(rect => (
        <rect
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          key={rect.id}
          data-key={rect.id}
          height="50"
          width="100"
          x={rect.x}
          y={rect.y}
          fill={rect.color}
        />
      )) : ''
    );
  }
}

RectList.propTypes = {
  changeCoord: PropTypes.func.isRequired,
  rectangles: PropTypes.array.isRequired,
};

export default RectList;
