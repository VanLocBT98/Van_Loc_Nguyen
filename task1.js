
const sum_to_n_method_1 = (n) => {
  return (n * (n + 1)) / 2;
};
const sum_to_n_method_2 = (n) => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};
const sum_to_n_method_3 = (n) => {
  return [...Array(n).keys()].reduce((acc, val) => acc + val + 1, 0);
};


