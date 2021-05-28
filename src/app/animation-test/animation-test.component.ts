import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  animate,
  animation,
  AnimationBuilder, AnimationPlayer,
  state,
  style,
  transition,
  trigger,
  useAnimation
} from '@angular/animations';
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

export class AnimationTestComponent implements OnInit, OnDestroy {

  constructor(
    private _builder: AnimationBuilder,
  ) { }
  timeline;
  timeline2;
  value = 1;
  tl = new TimelineLite();
  player: AnimationPlayer;

  animationDefinition = animation([
    animate('5000ms',
      style({
        transform: 'translateX({{distance}}px)',
      })
    )
  ]);

  myInterval;

  @ViewChild('divRef', {static: true}) refAng: ElementRef;
  @ViewChild('divRefTwo', {static: true}) refGS: ElementRef;

  ngOnInit() {
    this.myInterval = setInterval(() => {
      this.value = this.value === 1 ? 100 : 1;
      this.playAngularAnimation();
      // this.playAngularAnimation();
    }, 100);
  }

  ngOnDestroy(): void {
    this.killTimeline();

    if (this.myInterval) {
      clearInterval(this.myInterval);
    }
  }

  onKeyDynamic(e) {
    if (!isNaN(e.target.value)) {
      this.value = e.target.value;
      this.playGSAPAnimation();
    }
  }

  killAngularAnimation() {
    try {
      this.player.destroy();
      this.player = null;
    } catch (e){}
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
    if (animationFactory) {

      if (this.player) {
        this.killAngularAnimation();
      }

      this.player = animationFactory.create(this.refAng.nativeElement);
      try {
        this.player.play();
        this.player.onDone(() => {
          this.killAngularAnimation();
        });
      } catch (e) {}
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

  killTimeline() {
    if (this.timeline) {
      this.timeline.kill();
      this.timeline = null;
    }
  }
  deleteGSAPElement() {
    this.refGS.nativeElement.remove();
  }
  deleteAngularElement() {
    this.refAng.nativeElement.remove();
  }

  playGSAPAnimation() {
    this.killTimeline();
    this.timeline = new TimelineMax();
    this.timeline.from(this.refGS.nativeElement, 0, {x: 0, ease: `none`}, 0);
    this.timeline.to(this.refGS.nativeElement, 5, {x: this.value, ease: `none`}, 0);
    this.timeline.play();
  }

  playGSAPAnimation2() {
    if (this.timeline2) {
      this.timeline2.seek(0);
      this.timeline2.play();
    } else {
      this.timeline2 = new TimelineMax();
      this.timeline2.to(this.refGS.nativeElement, 5, {y: 0, ease: `none`}, 0);
      this.timeline2.to(this.refGS.nativeElement, 5, {y: this.value, ease: `none`}, 0);
      this.timeline2.play();
    }

  }

  playGSAPAnimationExtra() {
    for (let i = 0; i < 1000; i ++) {
      this.killTimeline();
      this.timeline = new TimelineMax();
      this.timeline.from(this.refGS.nativeElement, 0, {x: 0, ease: `none`}, 0);
      this.timeline.to(this.refGS.nativeElement, 5, {x: this.value, ease: `none`}, 0);
      this.timeline.play();
    }
  }

}
