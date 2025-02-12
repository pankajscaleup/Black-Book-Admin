import catchAsync from "../../utils/catchAsync";
import httpsCall from "../httpsCall";
import { IUsersRoleTable } from "../../interfaces/Itable";

export const userApi = catchAsync(async (values: any) => {
  const data = await httpsCall.post(`/admin/user-management/user-list/${values.currentPage}/${values.limit}`, values);
  return data;
});

export const userDetails = catchAsync(async (values) => {
  const response = await httpsCall.get(`/admin/user-management/edit-user/${values}`);
  return response;
});

export const addUser = catchAsync(async (values: IUsersRoleTable) => {
  const data = await httpsCall.post(`/admin/user-management/add-user`, values);
  return data;
});

export const deleteUser = catchAsync(async (uid) => {
  const data = await httpsCall.delete(`/admin/user-management/delete-user/${uid}`);
  return data;
});

export const updateUser = catchAsync(async (id, values: IUsersRoleTable) => {
  const data = await httpsCall.patch(`/admin/user-management/update-user/${id}`, values);
  return data;
});

export const updateVerificationStatus = catchAsync(async (uid, values) => {
  const data = await httpsCall.patch(`/admin/user-management/verification/${uid}`, values);
  return data;
});

export const updateActiveStatus = catchAsync(async (uid, values) => {
  const data = await httpsCall.patch(`/admin/user-management/block-unblock/${uid}`, values);
  return data;
});

export const updateProfile = catchAsync(async (values) => {
  const data = await httpsCall.patch(`/admin/profile/update`, values);
  return data;
});

export const updateProfileImage = catchAsync(async (values) => {
  const data = await httpsCall.patch(`/admin/profile/image-update`, values);
  return data;
});

export const userInvitationsApi = catchAsync(async (values) => {
  const response = await httpsCall.post(`admin/user-management/invitations/${values.id}/${values.currentPage}/${values.limit}`, values);
  return response;
});