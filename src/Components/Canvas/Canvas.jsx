import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RectsContainer from '../../Containers/RectsContainer';
import LinesContainer from '../../Containers/LinesContainer';
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
    if (checkSpace(rectangles, clientX, clientY)) {
      addRect(clientX, clientY);
    } else {
      alert('Не поместится');
    }
  }

  render() {
    return (
      <svg
        onDoubleClick={this.handleDoubleClick}
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
