import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { TableConfig } from 'src/app/core/model/interface/tableConfig.interface';
import { TableStructure } from 'src/app/core/model/class/tableStructure.class';
import * as _ from 'lodash';
import { ToastService } from 'src/app/layout/services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  fo;
  resultList = [];
  tableStructure: TableStructure;
  tableConfig: TableConfig = {
    cols: [
      { field: 'action', header: '', width: '60px', isSort: false },
      { field: 'subject', header: '*內容', width: '150px', isSort: false },
      { field: 'releaseDate', header: '*日期', width: '150px', isSort: false }
    ],
    isLoading: false
  };

  htmlEditQueryForm = {
    htmlEditTypeId: null,
    languageType: null,
    first: 0,
    rows: this.tableConfig.rows
  };

  constructor(
    private service: DashboardService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.query();
  }

  checkIsEmpty(value: string) {
    return _.isEmpty(_.trim(value));
  }

  reset() {
    this.toastService.showConfirm({ customContent: '確定要復原嗎?' })
      .afterClosed().subscribe((isChooseConfirm: boolean) => {
        if (isChooseConfirm) {
          this.tableStructure.reset();
          this.updateTableList();
        }
      });
  }

  onCreateRowData() {
    const lo = {
      htmlEditLanguageId: null,
      subject: null,
      releaseDate: null,
      isDelete: false
    };
    this.tableStructure.addRowData(lo);
    this.updateTableList();
  }

  onDeleteRowData(rowData: any) {
    this.toastService.showConfirm({ customContent: '確定要刪除嗎?' })
      .afterClosed().subscribe((isChooseConfirm: boolean) => {
        if (isChooseConfirm) {
          this.tableStructure.deleteRowData(rowData);
          this.updateTableList();
        }
      });
  }

  private updateTableList() {
    this.resultList = [..._.filter(this.tableStructure.tableResultList, (lo => {
      return lo.isDelete !== true;
    }))];
  }

  query() {
    const qfo = {
      first: 0,
      htmlEditTypeId: 1,
      languageType: 'chinese',
      rows: 5
    };
    this.service.query(qfo).subscribe((fo: any) => {
      this.fo = fo;
      this.tableStructure = new TableStructure(this.fo.resultList, 'htmlEditLanguageId', true);
      this.resultList = [...this.tableStructure.tableResultList];
    });
  }

}
