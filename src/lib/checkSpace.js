
const checkSpace = (arr, newX, newY) => {
  let isFree = true;
  Array.isArray(arr) && arr.forEach((val) => {
    const { x, y } = val;
    if (newX > (x - 100) && newY > (y - 50)
      && newX < (x + 100) && newY < (y + 50)) {
      isFree = false;
    }
  });
  return isFree;
};

export default checkSpace;
