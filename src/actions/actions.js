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

export const addLineStartPoint = (id, rectId, x, y) => (
  {
    type: C.DRAW_LINE_START,
    id,
    rectId,
    x,
    y,
  }
);

export const addLineEndPoint = (id, rectId, x, y) => (
  {
    type: C.DRAW_LINE_END,
    id,
    rectId,
    x,
    y,
  }
);

export const changeLineStart = (id, x, y) => (
  {
    type: C.CHANGE_LINE_START,
    id,
    x,
    y,
  }
);

export const changeLineEnd = (id, x, y) => (
  {
    type: C.CHANGE_LINE_END,
    id,
    x,
    y,
  }
);

export const addConnection = (rectId, lineId, position) => (
  {
    type: C.ADD_CONNECTION,
    rectId,
    lineId,
    position,
  }
);
