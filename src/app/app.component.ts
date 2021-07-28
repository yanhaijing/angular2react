import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'angular2react';

  public id = 0;

  public ngOnInit(): void {}

  public ngDoCheck(): void {
    console.log('react-demo-list ngDoCheck');
  }

  public onChangeId(id: number) {
    console.log('app-react-demo-list onChangeId id', id);
    this.id = id;
  }
}
