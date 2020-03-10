import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestcomponentComponent} from './testcomponent/testcomponent.component';
import {AnimationTestComponent} from './animation-test/animation-test.component';
import {EmptyComponentComponent} from "./empty-component/empty-component.component";


const routes: Routes = [
  {path: '', component: EmptyComponentComponent},
  {path: 'webworkers', component: TestcomponentComponent},
  {path: 'animation', component: AnimationTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
