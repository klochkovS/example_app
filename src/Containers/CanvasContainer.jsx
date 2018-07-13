import { connect } from 'react-redux';
import Canvas from '../Components/Canvas/Canvas';
import { addRect } from '../actions/actions';

const mapDispatchToProps = dispatch => ({
  addRect: dispatch(addRect()),
});

const CanvasContainer = connect(
  null,
  mapDispatchToProps,
)(Canvas);

export default CanvasContainer;
