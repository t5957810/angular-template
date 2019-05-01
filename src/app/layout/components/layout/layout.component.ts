import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import { map, tap, takeUntil, share } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CoreService } from 'src/app/core/core.service';
import { Menu } from 'src/app/core/model/interface/menu.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  isMobile$: Observable<boolean>;
  menuList$: Observable<Menu[]>;
  @ViewChild('snav') snav: MatSidenav; // 左側選單
  destory = new Subject();
  constructor(
    private breakpointObserver: BreakpointObserver,
    private coreService: CoreService
  ) {
    // 螢幕解析度小於1023px就視為行動版
    this.isMobile$ = this.breakpointObserver.observe('(max-width: 1023px)').pipe(
      map(match => match.matches),
      tap(isMobile => {
        // 如果不是行動版就要把左側選單關閉
        if (!isMobile) {
          this.snav.close();
        }
      }),
      takeUntil(this.destory)
    );
  }

  ngOnInit() {
    this.menuList$ = this.coreService.getMenuList().pipe(share());
  }
  ngOnDestroy(): void {
    this.destory.next();
    this.destory.complete();
  }
}
