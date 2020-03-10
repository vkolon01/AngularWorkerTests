import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  animate,
  animation,
  AnimationBuilder,
  state,
  style,
  transition,
  trigger,
  useAnimation
} from "@angular/animations";
import {TimelineLite, TimelineMax} from 'gsap';

@Component({
  selector: 'app-animation-test',
  templateUrl: './animation-test.component.html',
  styleUrls: ['./animation-test.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})

export class AnimationTestComponent implements OnInit {

  constructor(
    private _builder: AnimationBuilder,
  ) { }
  isOpen = false;
  value = 1;
  tl = new TimelineLite();

  animationDefinition = animation([
    style({
      transform: 'translateX(0)',
      opacity: '1'
    }),
    animate('5000ms',
      style({
        transform: 'translateX({{distance}}px)',
      })
    )
  ]);

  @ViewChild('divRef', {static: true}) refAng: ElementRef;
  @ViewChild('divRefTwo', {static: true}) refGS: ElementRef;

  ngOnInit() {
  }

  onKeyDynamic(e) {
    if (!isNaN(e.target.value)) {
      this.value = e.target.value;
      this.playGSAPAnimation();
    }
  }

  onKey(e) {
    if (!isNaN(e.target.value)) {
      this.value = e.target.value;
    }
  }

  playAngularAnimation() {

    const options = {
      params: {
        distance: this.value
      }
    };
    const animationFactory = this._builder.build(useAnimation(this.animationDefinition, options));
    let player;
    if (animationFactory) {
      player = animationFactory.create(this.refAng.nativeElement);
      player.play();
    }
  }

  playAngularAnimationExtra() {
    for (let i = 0; i < 1000; i ++) {
      const options = {
        params: {
          distance: this.value
        }
      };
      const animationFactory = this._builder.build(useAnimation(this.animationDefinition, options));
      let player;
      if (animationFactory) {
        player = animationFactory.create(this.refAng.nativeElement);
        player.play();
      }
    }
  }

  deleteAngularElement() {
    this.refAng.nativeElement.remove();
  }

  playGSAPAnimation() {

    const tlMax = new TimelineMax();
    tlMax.from(this.refGS.nativeElement, 0, {x: 0, ease: `none`}, 0);
    tlMax.to(this.refGS.nativeElement, 5, {x: this.value, ease: `none`}, 0);
    tlMax.play();

    // this.tl.to(this.refGS.nativeElement, {x: this.value, duration: 5000});
    //
    // this.tl.play();
  }


}
