import { v4 } from 'uuid';
import C from '../constants';


export const addRect = (x, y) => (
  {
    type: C.ADD_RECT,
    id: v4(),
    x,
    y,
  }
);
