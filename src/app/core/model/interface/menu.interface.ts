
export interface Menu {
  menuId: number;
  parentMenuId: number;
  actionUrl: string;
  menuName: string;
  menuNameC: string;
  display: string;
  dispSeq: number;
  isLeaf: string;
  level: number;
  subMenus: Menu[] | null;
}
