import catchAsync from "../../utils/catchAsync";
import httpsCall from "../httpsCall";

export const testimonialList = catchAsync(async (payload: any,currentPage:number,limit:number=10 ) => {
  const data = await httpsCall.post(`/admin/testimonial/list/${currentPage}/${limit}`,payload);
  return data;
});

export const testimonialDetails = catchAsync(async (uid) => {
  const response = await httpsCall.get(`/admin/testimonial/get-testimonial/${uid}`);
  return response;
});

export const addTestimonial = catchAsync(async (values) => {
  const data = await httpsCall.post(`/admin/testimonial/add-testimonial`, values);
  return data;
});

export const deleteTestimonial = catchAsync(async (uid) => {
  const data = await httpsCall.delete(`/admin/testimonial/delete-testimonial/${uid}`);
  return data;
});

export const updateTestimonial = catchAsync(async (values, uid) => {
  const data = await httpsCall.patch(`/admin/testimonial/update-testimonial/${uid}`, values);
  return data;
});
