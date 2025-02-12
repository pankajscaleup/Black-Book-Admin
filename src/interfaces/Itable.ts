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
  _id?:string;
}

export interface IUserID {
  email: string;
  fullName: string | null;
  profileimageurl:string;
  id:string;
}

export interface ITransactionTable {
  amount:number;
  type:string;
  paymentProfileId:string;
  transactionId:string;
  createdAt: string;
  updatedAt:string;
  userID: IUserID;
  _id: string;
}

export interface IUserReportsTable {
  chatId:string;
  report:string;
  resolved:boolean
  reportedUserDetails:reportedUserDetails;
  userDetails:reportedUserDetails;
  reportedUserId:any;
  userId:any;
  createdAt?: string;
  updatedAt?:string;
  _id: string;
}
export interface reportedUserDetails{
  email?: string;
  fullName: string | null;
  role?:string;
  _id:string;
}

export interface IWithdrawalTable {
  _id:string;
  userId:any;
  amount:number;
  transactionId:string;
  type:string;
  updatedAt:string;
  createdAt: string;
  status: string;
  bankId:any;
}

export interface IUsersSupportTable {
  _id: string;
  subject: string;
  message: string;
  status: string;
  userId: any;
}

export type complex =
  | IUsersRoleTable | IFaqTable | IUsersSupportTable | ITestTable | IFilterTable | ITransactionTable | 
  IWithdrawalTable | IUserReportsTable | IUsersEventTable

  export interface IStable {
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
    status: any;
  }

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


export interface IFtable {
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
  type: any;
  onEdit?: (filter: IFilterTable) => void; 
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

export interface ITestTable {
  _id: string;
  createdAt: any;
  title: string;
}

export interface IFilterTable { 
  _id: string;
  name: string;
  type: string;
  createdAt: any;

}

export interface ICustomstable {
  limit?: number;
  headData:  string[];
  pages?: number; 
  currPage?: number;
  changePage?: ( pageNumber: number) => void;
  bodyData: complex[];
  totalData: number;
  totalPage: number;
  dataCurrentPage: number;
  statuss?:string;
}

export interface IUsersEventTable {
  _id: string;
  userId: string;
  description: string;
  transportationMoney: any;
  date:any;
}

export interface Iinvitationtable {
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
  currentUser?: string;
}