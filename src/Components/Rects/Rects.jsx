import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import checkSpaceInDrag from '../../lib/checkSpaceInDrag';

class RectList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRectId: '',
      currentLineId: '',
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleRectMove = this.handleRectMove.bind(this);
    this.handleLineMove = this.handleLineMove.bind(this);
    this.handleLineBreak = this.handleLineBreak.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleLineBreak);
  }

  handleLineBreak(event) {
    event.preventDefault();
    const currentRectId = event.target.getAttribute('data-key');
    const { currentLineId } = this.state;
    const { addConnection } = this.props;
    addConnection(currentRectId, currentLineId, 'end');
    if (event.target.nodeName !== 'rect') {
      const { removeLine } = this.props;
      removeLine(currentLineId);
      document.removeEventListener('mousemove', this.handleLineMove);
    }
  }

  handleLineMove(event) {
    event.preventDefault();
    const { clientX, clientY } = event;
    const { currentRectId, currentLineId } = this.state;
    const { addLineEndPoint } = this.props;
    addLineEndPoint(currentLineId, currentRectId, clientX, clientY);
  }

  handleMouseDown(event) {
    event.preventDefault();
    const currentRectId = event.target.getAttribute('data-key');
    if (!event.ctrlKey) {
      this.setState({ currentRectId });
      document.addEventListener('mousemove', this.handleRectMove);
    } else {
      const { clientX, clientY } = event;
      const { addLine, addConnection, addLineStartPoint } = this.props;

      const currentLineId = v4();
      addLine(currentLineId);
      addLineStartPoint(currentLineId, currentRectId, clientX, clientY);
      addConnection(currentRectId, currentLineId, 'start');
      document.addEventListener('mousemove', this.handleLineMove);
      this.setState({ currentLineId });
    }
  }

  handleRectMove(event) {
    event.preventDefault();
    const { currentRectId } = this.state;
    const { rectangles, changeCoord } = this.props;
    let { clientX, clientY } = event;
    clientX -= 50;
    clientY -= 25;

    const coord = checkSpaceInDrag(rectangles, currentRectId, clientX, clientY);
    changeCoord(currentRectId, coord.x, coord.y);
  }

  handleMouseUp() {
    document.removeEventListener('mousemove', this.handleRectMove);
    document.removeEventListener('mousemove', this.handleLineMove);
    this.setState({ currentRectId: '', currentLineId: '' });
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
  addLine: PropTypes.func.isRequired,
  removeLine: PropTypes.func.isRequired,
  addLineStartPoint: PropTypes.func.isRequired,
  addLineEndPoint: PropTypes.func.isRequired,
};

export default RectList;
