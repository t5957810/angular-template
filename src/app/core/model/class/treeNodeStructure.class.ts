import * as _ from 'lodash';
import { TreeNode } from 'primeng/api';

export class TreeNodeStructure {
    private _childrenNameList: string[] = [];   // 各自階層的 childrenName，目前只能一階層
    private _idList: string[] = [];             // 各自階層的 id，目前只能一階層
    private _treeResultList: TreeNode[] = [];        // 給TreeTable用的 TreeList
    private _originalList: any[] = [];
    private _expandedAll: boolean;              // 是否要展開全部的tree
    private _levelMap = new Map<number, string>(); // 階層與陣列名稱對應Map，從第 0 階開始算
    private _idMap = new Map<number, string>(); // 每一層的id
    private _requiredMap = new Map<number, string[]>();
    private _childRequired: boolean;
    private _hasError = {};


    constructor(originalList: any, childrenNameList: string[], idList: string[], requiredMap = null,
                childRequired = false, expandedAll = true) {
        this._originalList = _.cloneDeep(originalList);
        this._childrenNameList = childrenNameList;
        this._idList = idList;
        this._requiredMap = requiredMap;
        this._expandedAll = expandedAll;
        this.buildLevelMap();
        this.buildTreeNodeList(this._originalList);
        this._childRequired = childRequired;
    }

    get treeResultList() {
        return this._treeResultList;
    }

    get hasError() {
        return this._hasError;
    }

    set hasError(value: any) {
        this._hasError = value;
    }


    getLevelOneChildrenName(): string {
        return this._childrenNameList[1];
    }

    setRequiredMap(requiredMap: Map<number, string[]>): void {
        this._requiredMap = requiredMap;
        this.updateTreeNodeList();
    }

    setChildRequired(childRequired: boolean): void {
        this._childRequired = childRequired;

    }

    private updateTreeNodeList() {
        if (!_.isEmpty(this._treeResultList)) {
            this._treeResultList.forEach((lo: any, index: number) => {
                let level = 0;
                // 第 0 階的 資料
                lo.data.required = this._requiredMap.get(level);

                // 是否有第 1 階
                level = level + 1;
                if (_.isEmpty(lo.children)) {
                    return;
                }

                // 第 1 階
                lo.children.forEach((nextLevelLo, i) => {
                    nextLevelLo.data.required = this._requiredMap.get(level);
                });
            });
        }
    }

    private buildLevelMap(): void {
        this._childrenNameList.forEach((childrenName, index) => {
            this._levelMap.set(index, childrenName);
        });

        this._idList.forEach((idName, index) => {
            this._idMap.set(index, idName);
        });
    }

    private setDataChildren(lo: any, index: number, level: number, isAdd = null): any {
        const obj = {
            data: _.assign({
                required: (this._requiredMap) ? this._requiredMap.get(level) : null,
                error: false,
                isAdd: (isAdd) ? true : false
            }, lo),
            children: [],
            index: index + 1,
            expanded: (this._expandedAll === true) ? true : false,
        };

        // 下一階的陣列屬性要移除
        obj.data = _.omit(obj.data, [this._levelMap.get(level + 1)]);
        return obj;
    }

    private buildTreeNodeList(originalList: any[]): void {
        if (!_.isEmpty(originalList)) {
            originalList.forEach((lo: any, index: number) => {

                let level = 0;
                // 第 0 階的 資料
                const row = this.setDataChildren(lo, index, level);

                // 是否有第 1 階
                level = level + 1;
                if (_.isEmpty(lo[this._levelMap.get(level)])) {
                    this._treeResultList = [...this._treeResultList, row];
                    return;
                }

                // 第 1 階
                lo[this._levelMap.get(level)].forEach((nextLevelLo, i) => {
                    const nextRow = this.setDataChildren(nextLevelLo, i, level);
                    row.children = [...row.children, nextRow];
                });
                this._treeResultList = [...this._treeResultList, row];
            });
        }
    }

    private reOrderIndex(list: any): void {
        list.forEach((lo: any, index: number) => {
            lo.index = index + 1;
        });
    }

    addRowData(eachLevelLo: any, rowNode = null): void {
        // 有 rowNode 表示要新增下一階的資料
        let data = null;

        if (rowNode) {
            data = this.setDataChildren(eachLevelLo, rowNode.node.children.length, (rowNode.level + 1), true);
            rowNode.node.children = [...rowNode.node.children, data];
            return;
        }

        // 沒有node 代表為新增第0階頭的資料
        data = this.setDataChildren(eachLevelLo, this._treeResultList.length, 0, true);
        this._treeResultList = [...this._treeResultList, data];
    }


    // 刪除一筆 RowData
    deleteRowData(rowNode: any): void {
        // 有id 表示原本的資料，刪除時要把isDelete 設為 true
        if (rowNode.node.data[this._idMap.get(rowNode.level)]) {
            rowNode.node.data.isDelete = true;
            // 有第 1 階的話也要一併調整 isDelete
            if (!_.isEmpty(rowNode.node.children)) {
                rowNode.node.children.forEach(element => {
                    element.data.isDelete = true;
                });
            }
            return;
        }

        // 沒有 id 表示為新增的，刪除時直接第1階移除
        if (rowNode.parent) {
            _.pullAt(rowNode.parent.children, [rowNode.node.index - 1]);
            this.reOrderIndex(rowNode.parent.children);
            return;
        }

        // 沒有id表示為新增的，刪除時直接第0階移除
        _.pullAt(this._treeResultList, [rowNode.node.index - 1]);

        this.reOrderIndex(this._treeResultList);
    }

    private checkIsEmpty(content: string): boolean {
        if (_.isNumber(content)) {
            return _.isNull(content);
        }
        return _.isEmpty(content);
    }


    // 將Tree結構轉回原始後端陣列結構
    transformTreeListToOriginalList(isCheckChildRequired = false) {
        this.hasError = {};
        let returnList = [];
        if (_.isEmpty(this._treeResultList)) {
            return [];
        }

        this._treeResultList.forEach(row => {
            let level = 0;
            // 第 0 階的 資料
            const lo = _.assign({}, row.data);

            _.mapValues(lo, (value, key) => {
                if (lo.required !== null && _.includes(lo.required, key)) {
                    if (this.checkIsEmpty(value)) {
                        row.data.error = true;
                        this.hasError['level' + level] = [];
                        this.hasError['level' + level] = [...this.hasError['level' + level], lo];
                        return;
                    }
                    row.data.error = false;
                }
            });

            // 是否有第 1 階
            level = level + 1;
            lo[this._levelMap.get(level)] = [];

            if (isCheckChildRequired && this._childRequired && _.isEmpty(_.filter(row.children, (treeNode => {
                return treeNode.data.isDelete !== true;
            })))) {
                row.data.error = true;
                this.hasError.childRequiredError = true;
            }

            if (_.isEmpty(row.children)) {
                returnList = [...returnList, lo];
                return;
            }

            // 第 1 階
            row.children.forEach((nextLevelLo, i) => {
                const nextLo = this.copyProperties(nextLevelLo.data, {});
                _.mapValues(nextLo, (value, key) => {
                    if (nextLo.required !== null && _.includes(nextLo.required, key)) {
                        if (this.checkIsEmpty(value)) {
                            nextLevelLo.data.error = true;
                            this.hasError['level' + level] = [];
                            this.hasError['level' + level] = [...this.hasError['level' + level], nextLo];
                            return;
                        }
                        nextLevelLo.data.error = false;
                    }
                });
                lo[this._levelMap.get(level)] = [...lo[this._levelMap.get(level)], nextLo];
            });
            returnList = [...returnList, lo];
        });

        if (!_.isEmpty(this.hasError)) {
            return null;
        }

        return returnList;
    }

    private copyProperties(source: any, target: any, ignoreList: string[] = []) {
        return _.assign(target, _.omit(source, ignoreList));
    }

}
