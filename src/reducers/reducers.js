import C from '../constants';

export const rect = (state = {}, action) => {
  switch (action.type) {
    case C.ADD_RECT:
      return {
        id: action.id,
        x: action.x,
        y: action.y,
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
