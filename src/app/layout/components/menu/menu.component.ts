import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/core/model/interface/menu.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() menuList: Observable<Menu[]>;
  @Input() menu;
  constructor(
  ) {}
  ngOnInit() {}
}
