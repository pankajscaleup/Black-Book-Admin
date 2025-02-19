import catchAsync from "../../utils/catchAsync";
import httpsCall from "../httpsCall";

export const getsettings = catchAsync(async () => {
  const response = await httpsCall.get(`/admin/setting/getsettings`);
  return response;
});

export const savesettings = catchAsync(async (values, id) => {
  const data = await httpsCall.patch(`/admin/setting/savesettings/${id}`, values);
  return data;
});

export const updateHeaderLogo = catchAsync(async (values, id) => {
    const data = await httpsCall.patch(`/admin/setting/header-logo-update/${id}`, values);
    return data;
  });

  
export const updateFooterLogo = catchAsync(async (values, id) => {
    const data = await httpsCall.patch(`/admin/setting/footer-logo-update/${id}`, values);
    return data;
  });

  
export const getFeaturedModels = catchAsync(async () => {
  const response = await httpsCall.get(`/admin/setting/getfeaturedmodels`);
  return response;
});

  
export const updateFeaturedModels = catchAsync(async (values) => {
  const response = await httpsCall.post(`/admin/setting/add-featuredmodels`,values);
  return response;
});