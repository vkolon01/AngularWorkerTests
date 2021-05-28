import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TestserviceService} from '../testservice.service';

@Component({
  selector: 'app-testcomponent',
  templateUrl: './testcomponent.component.html',
  styleUrls: ['./testcomponent.component.scss']
})
export class TestcomponentComponent implements OnInit, AfterViewInit {

  contents = [];
  contents2: Array<{content: string}> = [];
  numberOfCounters = 2;

  constructor(
    private serv: TestserviceService
  ) { }

  @ViewChild('box', {static: false}) boxRef: ElementRef;
  customStyles = {};
  ngOnInit() {
  }

  ngAfterViewInit() {


    for (let i = 0; i < this.numberOfCounters; i++) {
      this.contents.push('init');
      this.contents2.push({content: 'init'});
    }
    this.contents.forEach((content, i) => {
      this.startJoeWorker(10, i);
    });

    this.contents2.forEach((content, i) => {
      this.startArthurWorker(i);
    });
  }


  startJoeWorker(num, index) {
    this.serv.getMockData(num)
      .then(res => {
        this.contents[index] = res;
        console.log(res)
        this.startJoeWorker(++num, index);
      });
  }

  startArthurWorker(i) {
    this.serv.getArthurResponse(i, i)
      .then(res => {
        this.contents2[i].content = res;
      });
  }

}
