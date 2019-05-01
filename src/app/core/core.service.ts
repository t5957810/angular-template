import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Menu } from './model/interface/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor() { }

  getMenuList(): Observable<Menu[]> {
    return of([
      {
        menuId: 1,
        parentMenuId: 1,
        actionUrl: '/dashboard',
        menuName: '',
        menuNameC: '',
        display: 'Dashboard',
        dispSeq: 1,
        isLeaf: 'Y',
        level: 0,
        subMenus: []
      },
      {
        menuId: 2,
        parentMenuId: 2,
        actionUrl: '/charts',
        menuName: 'charts',
        menuNameC: '',
        display: '圖表',
        dispSeq: 2,
        isLeaf: 'Y',
        level: 0,
        subMenus: []
      }
    ]);
  }

}
