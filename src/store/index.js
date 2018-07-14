import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { rectangles, lines } from '../reducers/reducers';

const initialState = {
  rectangles: [],
  lines: [],
};

const reducers = combineReducers({
  rectangles,
  lines,
});

const logger = createLogger();

const storeFactory = () => createStore(
  reducers,
  initialState,
  applyMiddleware(logger),
);

export default storeFactory;
