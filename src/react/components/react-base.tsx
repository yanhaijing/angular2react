import { Directive, ElementRef, NgZone, OnDestroy } from "@angular/core";
import { ConfigProvider } from "antd";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Subject } from "rxjs";

@Directive({
  selector: "[react-base]",
})
export abstract class ReactBase implements OnDestroy {
  public readonly root?: ElementRef<HTMLElement>;
  public readonly destroyed$ = new Subject<void>();

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor(public readonly ngZone: NgZone) {}

  /**
   * 返回要渲染的react元素
   */
  public abstract getReact(): React.ReactNode;

  /**
   * 渲染react元素到root上面
   */
  public render() {
    // 此处配置context
    this.ngZone.runOutsideAngular(() => {
      ReactDOM.render(
        <>
          <ConfigProvider prefixCls="antdr">{this.getReact()}</ConfigProvider>
        </>,
        this.root.nativeElement
      );
    });
  }

  public ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    ReactDOM.unmountComponentAtNode(this.root.nativeElement);
  }
}
