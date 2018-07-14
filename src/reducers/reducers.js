import C from '../constants';

export const line = (state = {}, action) => {
  switch (action.type) {
    case C.ADD_LINE:
      return {
        id: action.id,
      };
    case C.DRAW_LINE_START:
      return (state.id !== action.id)
        ? state
        : {
          id: action.id,
          x1: action.x1,
          y1: action.y1,
        };
    case C.DRAW_LINE_END:
      return (state.id !== action.id)
        ? state
        : {
          ...state,
          x2: action.x2,
          y2: action.y2,
        };
    default:
      return state;
  }
};

export const lines = (state = [], action) => {
  switch (action.type) {
    case C.ADD_LINE:
      return [
        ...state,
        line({}, action),
      ];
    case C.REMOVE_LINE:
      return state.filter(l => l.id !== action.id);
    case C.DRAW_LINE_START:
      return state.map(l => line(l, action));
    case C.DRAW_LINE_END:
      return state.map(l => line(l, action));
    default:
      return state;
  }
};

export const rect = (state = {}, action) => {
  switch (action.type) {
    case C.ADD_RECT:
      return {
        id: action.id,
        x: action.x,
        y: action.y,
        color: action.color,
      };
    case C.CHANGE_COORD:
      return (state.id !== action.id)
        ? state
        : {
          ...state,
          x: action.x,
          y: action.y,
        };
    default:
      return state;
  }
};

export const rectangles = (state = [], action) => {
  switch (action.type) {
    case C.ADD_RECT:
      return [
        ...state,
        rect({}, action),
      ];
    case C.CHANGE_COORD:
      return state.map(r => rect(r, action));
    default:
      return state;
  }
};
