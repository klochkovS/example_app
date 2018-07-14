import { connect } from 'react-redux';
import Lines from '../Components/Lines/Lines';
import {
  changeCoord,
} from '../actions/actions';

const mapStateToProps = state => ({
  lines: state.lines,
});

// const mapDispatchToProps = dispatch => ({
//   changeCoord: (id, x, y) => dispatch(changeCoord(id, x, y)),
// });

const RectsContainer = connect(
  mapStateToProps,
  null,
)(Lines);

export default RectsContainer;
