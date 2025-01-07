import catchAsync from "../../utils/catchAsync";
import httpsCall from "../httpsCall";

// Get support list
export const supportList = catchAsync(async (values: any) => {
    const data = await httpsCall.post(`/admin/support/view-support/${values.currentPage}/${values.limit}`, values);
    return data;
});

// Delete Support
export const deleteSupport = catchAsync(async (values: any) => {
    const data = await httpsCall.delete(`/admin/support/delete-support/${values}`);
    return data;
});

// Delete Support
export const closeSupportRequest = catchAsync(async (id, values: any) => {
    const data = await httpsCall.patch(`/admin/support/close-support-request/${id}`, values);
    return data;
});