/// <reference lib="webworker" />

import {BehaviorSubject, Observable} from 'rxjs';

let counter = 0;

addEventListener('message', ({ data }) => {

  if (data && data.num1 !== null && data.num1 !== undefined && data.num2 !== null && data.num2 !== undefined) {

    const _beh = new BehaviorSubject('');
    const obs = 

    postMessage(add(data.num1, data.num2));
  } else {
    postMessage('bad parameters');
  }

});


function add(i: number, y: number) {

  return i + y;
}
