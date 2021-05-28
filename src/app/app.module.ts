import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestcomponentComponent } from './testcomponent/testcomponent.component';
import { AnimationTestComponent } from './animation-test/animation-test.component';
import { NavbarComponent } from './navbar/navbar.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { EmptyComponentComponent } from './empty-component/empty-component.component';
import { TextContentComponent } from './text-content/text-content.component';

@NgModule({
  declarations: [
    AppComponent,
    TestcomponentComponent,
    AnimationTestComponent,
    NavbarComponent,
    EmptyComponentComponent,
    TextContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
