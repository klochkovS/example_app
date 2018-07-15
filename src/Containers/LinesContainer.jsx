import { connect } from 'react-redux';
import Lines from '../Components/Lines/Lines';
import {
  removeLine,
  removeConnection,
} from '../actions/actions';

const mapStateToProps = state => ({
  lines: state.lines,
  rectangles: state.rectangles,
});

const mapDispatchToProps = dispatch => ({
  removeLine: id => dispatch(removeLine(id)),
  removeConnection: (rectId, lineId) => dispatch(removeConnection(rectId, lineId)),
});

const RectsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lines);

export default RectsContainer;
