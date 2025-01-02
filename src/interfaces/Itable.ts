export interface IUsersRoleTable {
  id: string;
  fullName: string | null;
  email: string;
  about: any;
  introImages:any;
  profileimageurl: string;
  role: string | null;
  isVerfied: any;
  isActive: any;
  createdAt: string;
  status: string;
  isSetupDone: any;
  notification:any;
  verification: any;
  socialLinks: any;
  privatemedia:any;
}

export type complex =
  | IUsersRoleTable |IFaqTable

export interface Itable {
  limit?: number;
  selectedCategory?: string;
  headData:  string[];
  dataShow?: complex[]; // Mark as optional
  pages?: number; // Mark as optional
  currPage?: number; // Mark as optional
  changePage?: ( pageNumber: number) => void; // Mark as optional
  bodyData: complex[];
  totalData: number;
  totalPage: number;
  dataCurrentPage: number;
  role: any;
}

export interface commonItable {
  title?: string
  limit?: number;
  selectedCategory?: string;
  searchTerm?:string // Mark as optional
  headData:  Record<string, string>;
  changePage?: (pageNumber: number) => void; // Mark as optional
  bodyData: complex[];
  totalData: number;
  totalPage: number;
  dataCurrentPage: number;
  deleteMessage?: string;
  handleDelete?: (id: string) => void ; 
  searchChange?:(term:string)=> void;
  slug?: string
}

export interface IFaqTable {
  _id: string;
  question: string;
  createdAt: any;
}
