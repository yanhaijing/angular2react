import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactDemoComponent } from './react-demo/react-demo.component';

@NgModule({
  declarations: [AppComponent, ReactDemoComponent],
  imports: [BrowserModule, AppRoutingModule, NzCardModule, NzButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
