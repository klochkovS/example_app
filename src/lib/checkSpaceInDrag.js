const checkSpaceInDrag = (arr, currentId, clientX, clientY) => {
  let newX = clientX;
  let newY = clientY;

  arr.forEach((val) => {
    const { id, x, y } = val;
    if (id !== currentId) {
      const left = clientX >= x - 100 && clientX <= x;
      const right = clientX <= x + 100 && clientX >= x;
      const top = clientY >= y - 50 && clientY <= y;
      const bottom = clientY <= y + 50 && clientY >= y;
      const conLeft = x - 100;
      const conTop = y - 50;
      const conBottom = y + 50;
      const conRight = x + 100;

      if (left && (top || bottom)) {
        if (clientY >= y - 25 && clientY <= y + 25) {
          newX = conLeft;
        } else if (top) {
          newY = conTop;
        } else {
          newY = conBottom;
        }
      }

      if (right && (top || bottom)) {
        if (clientY >= y - 25 && clientY <= y + 25) {
          newX = conRight;
        } else if (top) {
          newY = conTop;
        } else {
          newY = conBottom;
        }
      }
    }
  });

  return ({
    x: newX,
    y: newY,
  });
};

export default checkSpaceInDrag;
