import { Pipe, PipeTransform } from "@angular/core";
import { mod360 } from "../common/utils/translate";

@Pipe({
  name: "boundStyle",
})
export class BoundStylePipe implements PipeTransform {
  cursors: {};

  constructor() {}
  transform(point: string, config: any, cursors): unknown {
    this.cursors = cursors;
    const { width, height } = config;
    const hasT = /t/.test(point);
    const hasB = /b/.test(point);
    const hasL = /l/.test(point);
    const hasR = /r/.test(point);
    let newLeft = 0;
    let newTop = 0;

    // 四个角的点
    if (point.length === 2) {
      newLeft = hasL ? 0 : width;
      newTop = hasT ? 0 : height;
    } else {
      // 上下两点的点，宽度居中
      if (hasT || hasB) {
        newLeft = width / 2;
        newTop = hasT ? 0 : height;
      }

      // 左右两边的点，高度居中
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width;
        newTop = Math.floor(height / 2);
      }
    }

    const style = {
      marginLeft: hasR ? "-4px" : "-4px",
      marginTop: "-4px",
      left: `${newLeft}px`,
      top: `${newTop}px`,
      cursor: this.cursors[point],
    };

    return style;
  }
}
