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
    const { currentLineId } = this.state;
    if (event.ctrlKey) {
      const currentRectId = event.target.getAttribute('data-key');
      const { addConnection } = this.props;
      addConnection(currentRectId, currentLineId, 'end');
    }
    if (event.target.nodeName !== 'rect' || !event.ctrlKey) {
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
    const { clientX, clientY } = event;
    if (!event.ctrlKey) {
      document.addEventListener('mousemove', this.handleRectMove);
    } else {
      const { addLine, addLineStartPoint } = this.props;
      const currentLineId = v4();
      addLine(currentLineId);
      addLineStartPoint(currentLineId, currentRectId, clientX, clientY);
      document.addEventListener('mousemove', this.handleLineMove);
      this.setState({ currentLineId });
    }
    this.setState({
      currentRectId,
    });
  }

  handleRectMove(event) {
    event.preventDefault();
    const { currentRectId } = this.state;
    const {
      rectangles,
      changeCoord,
      changeLineStart,
      changeLineEnd,
    } = this.props;
    let { clientX, clientY } = event;
    clientX -= 50;
    clientY -= 25;

    const coord = checkSpaceInDrag(
      rectangles,
      currentRectId,
      clientX,
      clientY,
    );
    changeCoord(currentRectId, coord.x, coord.y);


    const thisRect = rectangles.filter(rect => rect.id === currentRectId);
    if (thisRect[0].connections.length > 0) {
      thisRect[0].connections.forEach((connection) => {
        console.log(connection.position);
        switch (connection.position) {
          case 'start': {
            changeLineStart(connection.lineId, coord.x + 50, coord.y + 25);
            break;
          }
          case 'end': {
            changeLineEnd(connection.lineId, coord.x + 50, coord.y + 25);
            break;
          }
          default:
            return console.log('Error...Connections not found');
        }
      });
    }
  }

  handleMouseUp(event) {
    if (event.ctrlKey) {
      const { currentRectId, currentLineId } = this.state;
      const { addConnection } = this.props;
      console.log(currentRectId, currentLineId);
      addConnection(currentRectId, currentLineId, 'start');
    }

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
  changeLineStart: PropTypes.func.isRequired,
  changeLineEnd: PropTypes.func.isRequired,
  rectangles: PropTypes.array.isRequired,
  addLine: PropTypes.func.isRequired,
  removeLine: PropTypes.func.isRequired,
  addLineStartPoint: PropTypes.func.isRequired,
  addLineEndPoint: PropTypes.func.isRequired,
  addConnection: PropTypes.func.isRequired,
};

export default RectList;
