import { connect } from 'react-redux';
import Rects from '../Components/Rects/Rects';
import {
  changeCoord,
  changeLineStart,
  changeLineEnd,
  addConnection,
  addLine,
  removeLine,
  addLineStartPoint,
  addLineEndPoint,
} from '../actions/actions';

const mapStateToProps = state => ({
  rectangles: state.rectangles,
  lines: state.lines,
});

const mapDispatchToProps = dispatch => ({
  changeCoord: (id, x, y) => dispatch(changeCoord(id, x, y)),
  changeLineStart: (id, x, y) => dispatch(changeLineStart(id, x, y)),
  changeLineEnd: (id, x, y) => dispatch(changeLineEnd(id, x, y)),
  addConnection: (rectId, lineId, position) => dispatch(addConnection(rectId, lineId, position)),
  addLine: id => dispatch(addLine(id)),
  removeLine: id => dispatch(removeLine(id)),
  addLineStartPoint: (id, rectId, x, y) => dispatch(addLineStartPoint(id, rectId, x, y)),
  addLineEndPoint: (id, rectId, x, y) => dispatch(addLineEndPoint(id, rectId, x, y)),
});

const RectsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Rects);

export default RectsContainer;
