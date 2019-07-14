import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {
  isChooseConfirm;
  constructor(private dialog: MatDialog) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '270px'
    });

    dialogRef.afterClosed().subscribe((isChooseConfirm) => {
      this.isChooseConfirm = isChooseConfirm;
    });
  }
  ngOnInit() {
  }

}
