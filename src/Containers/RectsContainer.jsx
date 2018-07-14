import { connect } from 'react-redux';
import Rects from '../Components/Rects/Rects';
import {
  changeCoord,
} from '../actions/actions';

const mapStateToProps = state => ({
  rectangles: state.rectangles,
});

const mapDispatchToProps = dispatch => ({
  changeCoord: (id, x, y) => dispatch(changeCoord(id, x, y)),
});

const RectsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Rects);

export default RectsContainer;
