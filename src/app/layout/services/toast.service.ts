import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

export interface ToastConfig {
    action: string;
    message: string;
    customContent?: string;
}
export interface ConfirmConfig {
    customContent?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    isLoading$ = new BehaviorSubject(false);

    constructor(
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) { }

    // showSuccess(config: ToastConfig) {
    //     const snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
    //         horizontalPosition: 'right',
    //         verticalPosition: 'top',
    //         panelClass: 'successSnackBar',
    //         duration: 2000,
    //         data: config,
    //     });
    //     return snackBarRef;
    // }

    // showError(config: ToastConfig) {
    //     const snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
    //         horizontalPosition: 'right',
    //         verticalPosition: 'top',
    //         panelClass: 'errorSnackBar',
    //         duration: 10000,
    //         data: config,
    //     });
    //     return snackBarRef;
    // }

    // showWarn(config: ToastConfig) {
    //     const snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
    //         horizontalPosition: 'right',
    //         verticalPosition: 'top',
    //         panelClass: 'warnSnackBar',
    //         duration: 3000,
    //         data: config,
    //     });
    //     return snackBarRef;
    // }

    // ** 若要完全客製化，如秒數，位置，顏色，請自行在自己的component中使用 snackBar。

    showConfirm(config: ConfirmConfig) {
        return this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: config
        });
    }

    closeAllToast() {
        this.snackBar.dismiss();
    }

    showLoading() {
        this.isLoading$.next(true);
    }
    closeLoading() {
        this.isLoading$.next(false);
    }
}
