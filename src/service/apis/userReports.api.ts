import catchAsync from "../../utils/catchAsync";
import httpsCall from "../httpsCall";
import { IUserReportsTable } from "../../interfaces/Itable";

export const UserReportsListApi = catchAsync(async (values: any) => {
  const data = await httpsCall.get(`/admin/report/get/${values.status}/${values.currentPage}/${values.limit}`, values);
  return data;
});

