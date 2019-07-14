import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetOverviewSheetComponent } from './bottom-sheet-overview-sheet/bottom-sheet-overview-sheet.component';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  }
  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetOverviewSheetComponent);
  }
}
