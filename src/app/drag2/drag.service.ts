import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
export interface SelectedData {
  index: string; // 多重拖拽的话是哪一级拖拽，用户自己保证唯一性，不能重复
  data: any; // 传递的数据
  el?: any;
}
@Injectable({
  providedIn: "root",
})
export class DragService {
  private _dragData = new BehaviorSubject<SelectedData>(null);
  selectedData: SelectedData;
  setDragData(data: SelectedData) {
    this._dragData.next(data);
  }
  //保证只能在service中更改数据，然后组件只能通过订阅来获取结果，asObservable()就是保证数据只能在service中进行更改
  getDragData(): Observable<SelectedData> {
    return this._dragData.asObservable();
  }

  clearDragData() {
    this._dragData.next(null);
  }

  constructor() {
    this._dragData.subscribe((res) => {
      console.log(res, 23);
    });
  }
}
