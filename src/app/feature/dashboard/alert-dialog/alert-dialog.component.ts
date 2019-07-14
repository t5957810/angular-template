import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit, OnDestroy {
  isChooseConfirm;
  destory = new Subject();
  constructor(private dialog: MatDialog) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '270px'
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destory)).subscribe((isChooseConfirm) => {
      this.isChooseConfirm = isChooseConfirm;
    });
  }
  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destory.next();
    this.destory.complete();
  }
}
