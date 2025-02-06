import catchAsync from "../../utils/catchAsync";
import httpsCall from "../httpsCall";
import { IUserReportsTable } from "../../interfaces/Itable";

export const UserReportsListApi = catchAsync(async (values: any) => {
  const data = await httpsCall.post(`/admin/report/get/${values.currentPage}/${values.limit}`, values);
  return data;
});

export const UserReportCloseApi = catchAsync(async (selectedCloseReqId:string,values: any) => {
  const data = await httpsCall.patch(`/admin/report/update-resolve/${selectedCloseReqId}`, values);
  return data;
});

export const deleteReportApi = catchAsync(async (selectedReportId:string,values: any) => {
  const data = await httpsCall.delete(`/admin/report/delete/${selectedReportId}`);
  return data;
});