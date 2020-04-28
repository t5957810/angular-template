import * as _ from 'lodash';

export class TableStructure {
    private _tableResultList: any[] = [];   // 給TreeTable用的 TreeList
    private _originalList: any[] = [];
    private _idName: string;
    private _rowDatadRequired: boolean;     // 至少有一筆
    private _hasError = {};
    private _uniqueOrder = 0;

    constructor(originalList: any, idName: string, rowDatadRequired = false) {
        this._originalList = _.cloneDeep(originalList);
        this._idName = idName;
        this._rowDatadRequired = rowDatadRequired;
        this.buildTableResultList(this._originalList);
    }

    get hasError() {
        return this._hasError;
    }

    get tableResultList() {
        this.checkIsEmpty();
        return this._tableResultList;
    }

    private checkIsEmpty(): void {
        if (this._rowDatadRequired && _.isEmpty(_.filter(this._tableResultList, (lo => {
            return lo.isDelete !== true;
        })))) {
            this._hasError['rowDatadRequired'] = true;
            return;
        }
        this._hasError = {};
    }

    private buildTableResultList(originalList: any[]): void {
        if (!_.isEmpty(originalList)) {
            this._uniqueOrder = 0;
            this._tableResultList = [];
            originalList.forEach((lo: any) => {
                // 設定唯一的uniqueOrder(for ngModel使用)
                const rowData = this.setUniqueOrder(lo, this._uniqueOrder++);
                this._tableResultList = [...this._tableResultList, rowData];
            });
        }
    }

    private setUniqueOrder(lo: any, order: number): any {
        const obj = _.assign({}, lo);
        obj['uniqueOrder'] = order + 1;
        obj['index'] = this._tableResultList.length + 1;
        return obj;
    }

    private reOrderIndex(list: any): void {
        list.forEach((lo: any, index: number) => {
            lo['index'] = index + 1;
        });
    }

    // 復原成初始值的樣子
    reset(): void {
        this.buildTableResultList(this._originalList);
    }

    // 新增一筆資料
    addRowData(lo: any): void {
        this._tableResultList = [...this._tableResultList, this.setUniqueOrder(lo, this._uniqueOrder++)];
    }

    // 刪除一筆 RowData
    deleteRowData(rowData: any): void {
        // 有id 表示原本的資料，刪除時要把isDelete 設為 true
        if (!_.isNull(rowData[this._idName])) {
            _.find(this._tableResultList, [this._idName, rowData[this._idName]])['isDelete'] = true;
            return;
        }

        // 沒有id表示為新增的，刪除時直接移除陣列裡對應的uniqueOrder物件
        _.remove(this._tableResultList, (data) => {
            return data['uniqueOrder'] === rowData['uniqueOrder'];
        });
        this.reOrderIndex(this._tableResultList);
    }

    reOrder(list): void {
        // 將tableResultList 依照頁面上現在的排序做重新排列
        const reOrderTableResultList = [];
        this._tableResultList.forEach(lo => {
            const index = _.findIndex(list, (o) => {
                return o['uniqueOrder'] === lo['uniqueOrder'];
            });
            reOrderTableResultList[index] = lo;
        });
        console.log(reOrderTableResultList);
    }

}
