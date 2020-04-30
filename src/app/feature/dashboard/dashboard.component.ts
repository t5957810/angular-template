import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { TableConfig } from 'src/app/core/model/interface/tableConfig.interface';
import { TableStructure } from 'src/app/core/model/class/tableStructure.class';
import * as _ from 'lodash';
import { ToastService } from 'src/app/layout/services/toast.service';
import { TreeNode } from 'primeng/api';
import { TreeNodeStructure } from 'src/app/core/model/class/treeNodeStructure.class';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  fo;
  regularAuditTaskFo;
  resultList = [];
  treeValueList: TreeNode[] = [];
  tableStructure: TableStructure;
  treeNodeStructure: TreeNodeStructure;

  tableConfig: TableConfig = {
    cols: [
      { field: 'action', header: '', width: '60px', isSort: false },
      { field: 'subject', header: '*內容', width: '150px', isSort: false },
      { field: 'releaseDate', header: '*日期', width: '150px', isSort: false }
    ],
    isLoading: false
  };

  refDocTableConfig: TableConfig = {
    cols: [
      { field: 'docName', header: '稽核依據', width: '120px', isSort: false },
      { field: 'processType', header: '製程', width: '90px', isSort: false },
      { field: 'stationName', header: '站點', width: '100px', isSort: false },
      { field: 'auditContent', header: '稽核內容/項目', width: '150px', isSort: false },
      { field: 'imageAttachment', header: '附件圖', width: '160px', isSort: false },
      { field: 'auditResult', header: '稽核結果說明', width: '150px', isSort: false },
      { field: 'auditJudgmentType', header: '稽核判定', width: '140px', isSort: false },
      { field: 'regularAuditIssue', header: '本次缺失', width: '80px', isSort: false },
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

  checkEmpty(value: string) {
    return _.isEmpty(_.trim(value));
  }

  // 檢查是否有必填，且是本次要檢查的項目
  checkIsEmpty(content: string, requiredList: string[], itemName: string): boolean {
    return _.isEmpty(content) && _.includes(requiredList, itemName);
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

  resetTree() {
    this.toastService.showConfirm({ customContent: '確定要復原?' })
      .afterClosed().subscribe((isChooseConfirm: boolean) => {
        if (isChooseConfirm) {
          this.newTreeNodeStructure(this.regularAuditTaskFo);
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

  // 新增樹的子
  onCreateLevelOneRowData(rowNode: any): void {
    const levelOneLo = {
      regularAuditExecuteContentId: null,
      auditContent: null,
      auditResult: null,
      auditJudgmentType: null,
      isDelete: false,
    };
    this.treeNodeStructure.addRowData(levelOneLo, rowNode);
    this.treeValueList = [...this.treeNodeStructure.treeResultList];
  }

  // 移除一筆
  onDeleteTreeRowData(rowNode: any): void {
    this.treeNodeStructure.deleteRowData(rowNode);
    this.treeValueList = [...this.treeNodeStructure.treeResultList];
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

  // 暫存只要檢查稽核內容為必填
  private buildRequiredMapForSave(): Map<number, string[]> {
    return new Map<number, string[]>().set(0, []).set(1, []);
  }

  private newTreeNodeStructure(fo: any): void {
    this.treeNodeStructure = new TreeNodeStructure(fo.regularAuditRefDocList,
      ['regularAuditRefDocList', 'regularAuditExecuteContentList'], ['regularAuditRefDocId', 'regularAuditExecuteContentId'],
      this.buildRequiredMapForSave());
    this.treeValueList = [...this.treeNodeStructure.treeResultList];
  }

  getTreeValue() {
    console.log('returnList= ', this.treeNodeStructure.transformTreeListToOriginalList());
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

      this.regularAuditTaskFo = fo;
      this.regularAuditTaskFo.regularAuditRefDocList = [{
        regularAuditRefDocId: 2,
        docName: 'Backend製程參數管理規範(V4)',
        processType: 'NA',
        stationName: '廠務',
        ekmDocId: 1490680814882,
        isDelete: false,
        regularAuditExecuteContentList: [{
          regularAuditExecuteContentId: 4,
          regularAuditRefDocId: 2,
          auditContent: 88,
          auditResult: 99999,
          auditJudgmentType: null,
          imageAttachmentFormNo: 'REGULAR_AUDIT_EXECUTE_CONTENT4',
          isDelete: false,
          hasIssue: false,
          imageAttachmentType: 'REGULAR_AUDIT_EXECUTE_CONTENT'
        }, {
          regularAuditExecuteContentId: 5,
          regularAuditRefDocId: 2,
          auditContent: 123,
          auditResult: 452,
          auditJudgmentType: null,
          imageAttachmentFormNo: 'REGULAR_AUDIT_EXECUTE_CONTENT5',
          isDelete: false,
          hasIssue: false,
          imageAttachmentType: 'REGULAR_AUDIT_EXECUTE_CONTENT'
        }, {
          regularAuditExecuteContentId: 6,
          regularAuditRefDocId: 2,
          auditContent: 'DDD',
          auditResult: null,
          auditJudgmentType: null,
          imageAttachmentFormNo: 'REGULAR_AUDIT_EXECUTE_CONTENT6',
          isDelete: false,
          hasIssue: false,
          imageAttachmentType: 'REGULAR_AUDIT_EXECUTE_CONTENT'
        }
        ]
      }, {
        regularAuditRefDocId: 1,
        docName: '研發廠避難逃生設施工作指導書(V3)',
        processType: 'NA',
        stationName: '庫房',
        ekmDocId: 1509006289547,
        isDelete: false,
        regularAuditExecuteContentList: null
      }, {
        regularAuditRefDocId: 3,
        docName: '捲帶無塵室清潔工作指導書(V6)',
        processType: 'NA',
        stationName: '更衣室',
        ekmDocId: 1406864888718,
        isDelete: false,
        regularAuditExecuteContentList: null
      }
      ];
      this.newTreeNodeStructure(fo);
    });
  }

}
