import { connect } from 'react-redux';
import Rects from '../Components/Rects/Rects';
import {
  changeCoord,
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
  addLine: id => dispatch(addLine(id)),
  removeLine: id => dispatch(removeLine(id)),
  addLineStartPoint: (id, x, y) => dispatch(addLineStartPoint(id, x, y)),
  addLineEndPoint: (id, x, y) => dispatch(addLineEndPoint(id, x, y)),
});

const RectsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Rects);

export default RectsContainer;
