import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { rectangles } from '../reducers/reducers';

const initialState = {

};

const logger = createLogger();

const storeFactory = () => createStore(
  rectangles,
  initialState,
  applyMiddleware(logger),
);

export default storeFactory;
