import { v4 } from 'uuid';
import C from '../constants';


export const addRect = (x, y) => {
  // const midX = x - 50;
  // const midY = y - 25;

  return ({
    type: C.ADD_RECT,
    id: v4(),
    x,
    y,
  });
};
