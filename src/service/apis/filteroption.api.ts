import catchAsync from "../../utils/catchAsync";
import httpsCall from "../httpsCall";

export const filterList = catchAsync(async (values: any) => {
    const data = await httpsCall.get(`/admin/filter/get-filter-names/${values.type}/${values.currentPage}/${values.limit}`);
    return data;
});

export const deleteFilter = catchAsync(async (values: any) => {
    const data = await httpsCall.delete(`/admin/filter/delete-filter/${values}`);
    return data;
});

export const addOrUpdateFilterOption = catchAsync(async ( data ) => {
    const id = data.id;
    const values = {
        name: data.name,
        type: data.type
    }
    if(id){
        const data = await httpsCall.patch(`/admin/filter/update-filter/${id}`, values);
        return data;
    }else{
        const data = await httpsCall.post(`/admin/filter/add-filter`, values);
        return data;
    }
});