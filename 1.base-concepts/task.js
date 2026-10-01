"use strict"
function solveEquation(a, b, c) {
  const discriminant = b ** 2 - 4 * a * c;

  if (discriminant < 0) {
    return [];
  }

  if (discriminant === 0) {
    const root = -b / (2 * a);
    return [root];
  }

  const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
  const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);

  return [root1, root2];
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  function toNumber(value) {
    if (typeof value === 'number') {
      return value;
    }

    if (typeof value === 'string') {
      return Number(value);
    }

    return NaN;
  }

  const numericPercent = toNumber(percent);
  const numericContribution = toNumber(contribution);
  const numericAmount = toNumber(amount);
  const numericCountMonths = toNumber(countMonths);

  const values = [numericPercent, numericContribution, numericAmount, numericCountMonths];
  const hasInvalidValue = values.some((value) => Number.isNaN(value));

  if (hasInvalidValue) {
    return false;
  }

  const monthlyRate = numericPercent / 100 / 12;
  const loanBody = numericAmount - numericContribution;

  const growthFactor = (1 + monthlyRate) ** numericCountMonths;
  const monthlyPayment = loanBody * (monthlyRate + (monthlyRate / (growthFactor - 1)));

  const total = monthlyPayment * numericCountMonths;

  return Math.round(total * 100) / 100;
}