import * as math from "mathjs";

// 加
export const add = (num1, num2) => {
  return math.add(math.bignumber(num1), math.bignumber(num2));
};
// 乘
export const multiply = (num1, num2) => {
  return math.multiply(math.bignumber(num1), math.bignumber(num2));
};
// 减
export const subtract = (num1, num2) => {
  return math.subtract(math.bignumber(num1), math.bignumber(num2));
};
// 除
export const divide = (num1, num2) => {
  return math.divide(math.bignumber(num1), math.bignumber(num2));
};
