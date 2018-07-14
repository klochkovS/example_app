import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import RectsContainer from '../../Containers/RectsContainer';
import LinesContainer from '../../Containers/LinesContainer';
import checkSpace from '../../lib/checkSpace';


class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLineId: '',
    };

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
    const { addLine, addLineStartPoint } = this.props;
    const { clientX, clientY } = event;
    const currentLineId = v4();
    if (event.ctrlKey) {
      addLine(currentLineId);
      addLineStartPoint(currentLineId, clientX, clientY);
    }
    this.setState({
      currentLineId,
    });

    document.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove(event) {
    const { currentLineId } = this.state;
    const { addLineEndPoint } = this.props;
    const { clientX, clientY } = event;
    if (event.ctrlKey) {
      addLineEndPoint(currentLineId, clientX, clientY);
    }
  }

  handleMouseUp() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.setState({ currentLineId: '' });
  }

  render() {
    return (
      <svg
        onDoubleClick={this.handleDoubleClick}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        height="100%"
        width="100%"
      >
        <LinesContainer />
        <RectsContainer />
      </svg>
    );
  }
}

Canvas.propTypes = {
  addRect: PropTypes.func.isRequired,
  rectangles: PropTypes.array,
};

export default Canvas;
