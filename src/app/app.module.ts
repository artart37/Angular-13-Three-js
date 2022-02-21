import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ShapeSpace } from './shared/components/shape-space/modules/shape-space.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ShapeSpace
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
