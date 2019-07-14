import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet-overview-sheet',
  templateUrl: './bottom-sheet-overview-sheet.component.html',
  styleUrls: ['./bottom-sheet-overview-sheet.component.scss']
})
export class BottomSheetOverviewSheetComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewSheetComponent>) { }

  ngOnInit() {
  }
  openLink(action: string = null): void {
    this.bottomSheetRef.dismiss(action);
  }
}
