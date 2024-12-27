import catchAsync from "../../utils/catchAsync";
import httpsCall from "../httpsCall";

export const faqList = catchAsync(async (payload: any,currentPage:number,limit:number=10 ) => {
  const data = await httpsCall.post(`/admin/faq/list/${currentPage}/${limit}`,payload);
  return data;
});

export const faqDetails = catchAsync(async (uid) => {
  const response = await httpsCall.get(`/admin/faq/get-faq/${uid}`);
  return response;
});

export const addFaq = catchAsync(async (values) => {
  const data = await httpsCall.post(`/admin/faq/add-faq`, values);
  return data;
});

export const deleteFaq = catchAsync(async (uid) => {
  const data = await httpsCall.delete(`/admin/faq/delete-faq/${uid}`);
  return data;
});

export const updateFaq = catchAsync(async (values, uid) => {
  const data = await httpsCall.patch(`/admin/faq/update-faq/${uid}`, values);
  return data;
});
