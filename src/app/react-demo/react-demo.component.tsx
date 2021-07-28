import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as React from 'react';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ReactBase } from 'src/react/components/react-base';
import { Demo } from 'src/react/module-demo/demo';

@Component({
  selector: 'app-react-demo',
  templateUrl: './react-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactDemoComponent extends ReactBase implements OnInit {
  @Input() public set id(id: number) {
    this.id$.next(id);
  }

  @Output() public onchange = new EventEmitter<number>();

  public id$ = new ReplaySubject<number>(1);
  public myid: number;

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor(public readonly ngZone: NgZone) {
    super(ngZone);
  }

  @ViewChild('root', { static: true })
  public readonly root!: ElementRef<HTMLElement>;

  public ngOnInit() {
    console.log('app-react-demo ngOnInit');
    // 参数改变时，重新渲染
    this.id$
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((id) => {
        console.log('this.id$ subscribe', id);
        this.myid = id;
        this.render();
      });
  }

  public getReact(): React.ReactNode {
    return (
      <Demo
        id={this.myid}
        onChange={(id) => {
          this.ngZone.run(() => {
            console.log('app-react-demo onChange', id);
            this.onchange.emit(id);
          });
        }}
      />
    );
  }
}
