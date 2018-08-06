import { connect } from 'react-redux';
import Canvas from '../Components/Canvas/Canvas';
import { addRect } from '../actions/actions';

const mapStateToProps = state => ({
  rectangles: state.rectangles,
});

const mapDispatchToProps = dispatch => ({
  addRect: (x, y) => dispatch(addRect(x, y)),
});

const CanvasContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Canvas);

export default CanvasContainer;
