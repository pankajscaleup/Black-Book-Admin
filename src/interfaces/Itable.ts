export interface IUsersRoleTable {
  id: string;
  fullName: string | null;
  email: string;
  about: any;
  introImages:any;
  profileimageurl: string;
  role: string | null;
  isVerfied: any;
  createdAt: string;
  status: string;
  isSetupDone: any;
  notification:any;
}

export type complex =
  | IUsersRoleTable

export interface Itable {
  limit?: number;
  selectedCategory?: string;
  headData: string[];
  dataShow?: complex[]; // Mark as optional
  pages?: number; // Mark as optional
  currPage?: number; // Mark as optional
  changePage?: (pageNumber: number) => void; // Mark as optional
  bodyData: complex[];
  role: string;
  totalData: number;
  totalPage: number;
  dataCurrentPage: number;
}
