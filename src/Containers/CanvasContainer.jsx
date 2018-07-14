import { connect } from 'react-redux';
import Canvas from '../Components/Canvas/Canvas';
import {
  addRect,
  addLine,
  addLineStartPoint,
  addLineEndPoint,
} from '../actions/actions';

const mapStateToProps = state => ({
  rectangles: state.rectangles,
  lines: state.lines,
});

const mapDispatchToProps = dispatch => ({
  addRect: (x, y) => dispatch(addRect(x, y)),
  addLine: id => dispatch(addLine(id)),
  addLineStartPoint: (id, x, y) => dispatch(addLineStartPoint(id, x, y)),
  addLineEndPoint: (id, x, y) => dispatch(addLineEndPoint(id, x, y)),
});

const CanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Canvas);

export default CanvasContainer;
