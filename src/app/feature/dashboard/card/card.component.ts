import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  cardList = [
    {
      col: 'col-sm-12 col-md-6 col-lg-3',
      title: '擴增實境',
      subtitle: '改變你工作、學習、遊戲以及與周圍一切聯繫的方式。',
      link: 'https://www.apple.com/v/iphone/home/aa/images/overview/ar__br7s4bd68h0i_large_2x.jpg'
    },
    {
      col: 'col-sm-12 col-md-6 col-lg-3',
      title: '家庭',
      subtitle: '我們和你一樣，想為你的家人做到最好。',
      link: 'https://www.apple.com/v/iphone/home/aa/images/overview/families__ebuveiadga2q_large_2x.jpg'
    },
    {
      col: 'col-sm-12 col-md-6 col-lg-6',
      title: 'iOS 12',
      subtitle: '更強力量，在你手裡。',
      link: 'https://www.apple.com/tw/iphone/home/images/overview/ios_12__dh28kytfy8mu_large_2x.jpg'
    },
    {
      col: 'col-sm-12 col-md-12 col-lg-12',
      title: 'iPhone 商務應用',
      subtitle: '進一步瞭解 iPhone 在商務領域中的運用',
      link: 'https://www.apple.com/v/iphone/home/aa/images/overview/shot_on_iphone__1gudq2howhu2_large_2x.jpg'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
