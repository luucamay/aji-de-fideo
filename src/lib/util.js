
export function moneyToString(number) {
  if (number === 0) {
    return '0.00';
  }
  let moneyStr = number.toString();
  moneyStr = moneyStr.slice(0, -2) + '.' + moneyStr.slice(-2);
  return moneyStr;
}

export const calcTotal = (products) => products.reduce((accumulator, currentValue) => (accumulator + currentValue.price), 0);
