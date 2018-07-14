import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import checkSpaceInDrag from '../../lib/checkSpaceInDrag';

class RectList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: '',
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
    const { removeLine } = this.props;
    const { currentLineId } = this.state;
    if (event.target.nodeName !== 'rect') {
      removeLine(currentLineId);
      document.removeEventListener('mousemove', this.handleLineMove);
    }
  }

  handleLineMove(event) {
    const { clientX, clientY } = event;
    const { currentLineId } = this.state;
    const { addLineEndPoint } = this.props;
    addLineEndPoint(currentLineId, clientX, clientY);
  }

  handleMouseDown(event) {
    event.preventDefault();
    if (event.ctrlKey) {
      const currentLineId = v4();
      const { addLine, addLineStartPoint } = this.props;
      const { clientX, clientY } = event;
      addLine(currentLineId);
      addLineStartPoint(currentLineId, clientX, clientY);
      console.log('YYYYYYY', currentLineId);
      this.setState({ currentLineId });
      document.addEventListener('mousemove', this.handleLineMove);
    } else {
      const currentId = event.target.getAttribute('data-key');
      this.setState({ currentId });
      document.addEventListener('mousemove', this.handleRectMove);
    }

  }

  handleRectMove(event) {
    event.preventDefault();
    const { currentId, currentLineId } = this.state;
    const { rectangles, changeCoord, removeLine } = this.props;
    let { clientX, clientY } = event;
    clientX -= 50;
    clientY -= 25;

    if (event.ctrlKey) {
    } else {
      const coord = checkSpaceInDrag(rectangles, currentId, clientX, clientY);
      changeCoord(currentId, coord.x, coord.y);
    }
  }

  handleMouseUp(event) {
    //document.removeEventListener('mouseup', this.handleLineBreak);
    event.stopPropagation();
    document.removeEventListener('mousemove', this.handleRectMove);
    this.setState({ currentId: '', currentLineId: '' });
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
