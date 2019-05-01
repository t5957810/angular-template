import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/core/model/interface/menu.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() menuList: Observable<Menu[]>;
  @Input() menu;
  @Input() isMobile;

  constructor() {
  }

  ngOnInit() {

  }

}
