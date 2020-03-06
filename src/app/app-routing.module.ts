import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestcomponentComponent} from './testcomponent/testcomponent.component';


const routes: Routes = [
  {path: '', component: TestcomponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
