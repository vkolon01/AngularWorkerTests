/// <reference lib="webworker" />

let counter = 0;

addEventListener('message', ({ data }) => {
  postMessage(counter + data + '');
  counter++;
});
