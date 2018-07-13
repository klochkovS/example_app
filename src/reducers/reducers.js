import C from '../constants';

export const rect = (state = {}, action) => {
  switch (action.type) {
    case C.ADD_RECT:
      return {
        id: action.id,
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
    default:
      return state;
  }
};
