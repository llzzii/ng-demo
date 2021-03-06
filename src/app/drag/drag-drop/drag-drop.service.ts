import { NullTemplateVisitor } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface DragData {
  tag: string; // 多重拖拽的话是哪一级拖拽，用户自己保证唯一性，不能重复
  data: any; // 传递的数据
  el?: any;
}

@Injectable({
  providedIn: 'root',
})
export class DragDropService {
  private _dragData = new BehaviorSubject<DragData>(null);

  setDragData(data: DragData) {
    this._dragData.next(data);
  }

  getDragData(): Observable<DragData> {
    return this._dragData.asObservable();
  }

  clearDragData() {
    this._dragData.next(null);
  }

  constructor() {}
}
