/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  fibonacciCalculation(data)
    .then(result => {
      postMessage(result);
    });
});


function fib(num: number) {
  let result = 0;
  if (num < 2) {
    result = num;
  } else {
    result = fib(num - 1) + fib(num - 2);
  }

  return result;
}

function fibonacciCalculation(num) {
  return new Promise(resolve => {
    resolve(fib(num));
  });
}
