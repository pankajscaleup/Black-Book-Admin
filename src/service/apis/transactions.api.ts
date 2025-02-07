import catchAsync from "../../utils/catchAsync";
import httpsCall from "../httpsCall";
import { ITransactionTable } from "../../interfaces/Itable";


export const transactionsListApi = catchAsync(async (bodyData: any) => {
    const searchQuery = bodyData?.search || ''; 
    const data = await httpsCall.get(`/admin/transaction/list/${bodyData.currentPage}/${bodyData.limit}?search=${encodeURIComponent(searchQuery)}`, bodyData);
    return data;
  });

  export const deletetransaction = catchAsync(async (selectedTransactionId) => {
    const data = await httpsCall.delete(`/admin/transaction/delete/${selectedTransactionId}`);
    return data;
  });
  
  export const WithdrawalListApi = catchAsync(async (bodyData: any) => {
    const data = await httpsCall.post(`/admin/withdraw/model-withdraw/${bodyData.currentPage}/${bodyData.limit}`, bodyData);
    return data;
  });
  
  export const WithdrawalStatusUpdate = catchAsync(async (_id:string,bodyData:any) => {
    const data = await httpsCall.patch(`/admin/withdraw/status-update-withdraw/${_id}`, bodyData);
    return data;
  });