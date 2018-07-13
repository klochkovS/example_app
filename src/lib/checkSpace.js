
const checkSpace = (arr, newX, newY) => {
  let flag = true;
  Array.isArray(arr) && arr.forEach((val) => {
    const { x, y } = val;
    if (newX > (x - 100) && newY > (y - 50)
      && newX < (x + 100) && newY < (y + 50)) {
      flag = false;
    }
  });
  return flag;
};

export default checkSpace;
