import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestserviceService {

  constructor() { }

  getMockData(num): Promise<any> {
    return new Promise((resolve) => {

      setTimeout(() => {

        const worker = new Worker('./joe.worker', {type: 'module'});
        worker.onmessage = ({ data }) => {
          worker.terminate();
          resolve(data);
        };
        worker.postMessage(num);

      }, 100);
    });
  }

  getArthurResponse(num1, num2): Promise<string> {
    return new Promise(resolve => {
      const worker = new Worker('./arthur.worker', {type: 'module'});

      worker.onmessage = ({ data }) => {
        resolve(data);
      };

      worker.postMessage({num1, num2});
    });
  }

}
