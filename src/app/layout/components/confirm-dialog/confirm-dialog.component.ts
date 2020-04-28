import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    ) { }

    get title() {
        return '確認';
    }

    get customContent() {
        return this.data.customContent;
    }

    ngOnInit() {
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }

}
