import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetOverviewSheetComponent } from './bottom-sheet-overview-sheet/bottom-sheet-overview-sheet.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit, OnDestroy {
  destory = new Subject();
  chooseAction;
  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  }
  openBottomSheet(): void {
    const bottomSheetRef = this.bottomSheet.open(BottomSheetOverviewSheetComponent);

    bottomSheetRef.afterDismissed().pipe(takeUntil(this.destory)).subscribe((chooseAction) => {
      this.chooseAction = chooseAction;
    });
  }

  ngOnDestroy(): void {
    this.destory.next();
    this.destory.complete();
  }
}
