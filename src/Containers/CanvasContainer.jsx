import { connect } from 'react-redux';
import Canvas from '../Components/Canvas/Canvas';
import {
  addRect,
  changeCoord,
} from '../actions/actions';

const mapStateToProps = state => ({
  rectangles: state,
});

const mapDispatchToProps = dispatch => ({
  addRect: (x, y) => dispatch(addRect(x, y)),
  changeCoord: (id, x, y) => dispatch(changeCoord(id, x, y)),
});

const CanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Canvas);

export default CanvasContainer;
