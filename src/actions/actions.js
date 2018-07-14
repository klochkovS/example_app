import { v4 } from 'uuid';
import C from '../constants';

const colors = [
  'yellowgreen',
  'royalblue',
  'coral',
  'hotpink',
  'sandybrown',
  'deepskyblue',
  'lightpink',
  'darkviolet',
  'lightgray',
  'peachpuff',
];

export const addRect = (x, y) => {
  const rand = Math.round(0 - 0.5 + Math.random() * 10);
  return ({
    type: C.ADD_RECT,
    id: v4(),
    x,
    y,
    color: colors[rand],
  });
};

export const changeCoord = (id, x, y) => (
  {
    type: C.CHANGE_COORD,
    id,
    x,
    y,
  }
);

export const addLine = id => (
  {
    type: C.ADD_LINE,
    id,
  }
);

export const removeLine = id => (
  {
    type: C.REMOVE_LINE,
    id,
  }
);

export const addLineStartPoint = (id, x1, y1) => (
  {
    type: C.DRAW_LINE_START,
    id,
    x1,
    y1,
    x2: x1,
    y2: y1,
  }
);

export const addLineEndPoint = (id, x2, y2) => (
  {
    type: C.DRAW_LINE_END,
    id,
    x2,
    y2,
  }
);
