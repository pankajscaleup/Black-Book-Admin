import { useEffect, useState } from "react";
import CustomTableFilters from "../../components/tables/customTable/CustomTableFilters";
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import { IFilterTable } from "../../interfaces/Itable";
import tabwrap from "./tabwrap.module.scss";
import { adminFilterHeader } from "../../constants/tables";
import { filterList, addOrUpdateFilterOption } from "../../service/apis/filteroption.api";
import withRole from "../withRole";
import { Tabs, Box } from "@mui/material";
import ButtonBase from '@mui/material/ButtonBase';
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function FilterOptions() {
  const [data, setData] = useState<IFilterTable[]>([]);
  const [loading, setLoading] = useState(true); 
  const [totalFilter, setTotalFilter] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { type } = useParams<{ type?: string; }>();
  const limit = 10;

  console.log(type);

  const getFilter = async (type: string) => {
    setLoading(true);
    try {
      const bodyData = {
        currentPage: 1,
        limit: 10,
        type: type,
      };
      const response = await filterList(bodyData);
        setData(response?.names?.names);
        setTotalFilter(response?.names?.totalResults);
        setTotalPage(response?.names?.totalPages);
        setCurrentPage(response?.names?.page);
    } catch (err) {
      console.error("Failed to fetch data", err);
      setLoading(false)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (type) {
      getFilter(type);
    }
  }, [type]);

  const getFormattedType = (type: string | undefined): string => {
    if (!type) return "";
    switch (type) {
      case "body-type":
        return "body type";
      case "not-iterestedin":
        return "not iterested in"; 
      case "iterestedin":
        return "iterested in";
      case "relationship-status":
          return "relationship status";
      default:
        return type;
    }
  };
  
  const handleAddOrUpdateFilterOption = async (filterToEdit?: IFilterTable) => {
    const isEdit = !!filterToEdit;
    const formattedType = getFormattedType(type);
    const { value: formValues } = await Swal.fire({
      title: isEdit ? `Update ${formattedType}` : `Add ${formattedType}`,
      html: `
        <input id="swal-input-name" class="swal2-input" placeholder="Enter Name" value="${filterToEdit?.name || ""}" />
        <input type="hidden" id="swal-input-type" value="${type}" />
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: isEdit ? "Update" : "Add",
      preConfirm: () => {
        const name = (document.getElementById("swal-input-name") as HTMLInputElement)?.value;
        const typeValue = (document.getElementById("swal-input-type") as HTMLInputElement)?.value;
        if (!name) {
          Swal.showValidationMessage("Field is required!");
          return null;
        }
        return { name, type: typeValue };
      },
    });

    if (formValues) {
      try {
        const response = await addOrUpdateFilterOption({
          ...formValues,
          id: filterToEdit?._id,
        });

        if (response.status === 200) {
          Swal.fire("Success", `Filter option ${isEdit ? "updated" : "added"} successfully!`, "success");
          if (type) {
            getFilter(type);
          }
        } else {
          Swal.fire("Error", "Failed to save filter option", "error");
        }
      } catch (err) {
        Swal.fire("Error", "Something went wrong", "error");
      }
    }
  };

  return (
    <section className="users-pages">
      <Box className={`${tabwrap.boxWrap}`}>
        <Tabs
          className={`${tabwrap.tabwrapper} ${tabwrap.btnholder}`}
          aria-label='role tabs'
          sx={{
            "& .MuiTab-root": { background: "var(--dark)" },
            "& .Mui-selected": {
              background: "#b37a4f!important",
              color: "#fff !important",
            },
            "& .MuiTabs-indicator": { display: "none" },
          }}
        >
        </Tabs> 
        <ButtonBase className={`${tabwrap.adduserbtn} ${tabwrap.btnyellow}`} onClick={() => handleAddOrUpdateFilterOption()} >ADD FILTER OPTION</ButtonBase>
      </Box>

      {loading ? (
        <LoadingSpinner /> 
      ) : (
        <CustomTableFilters
          limit={limit}
          headData={adminFilterHeader}
          bodyData={data as IFilterTable[]}
          type={type}
          totalData={totalFilter}
          totalPage={totalPage}
          dataCurrentPage={currentPage}
          onEdit={handleAddOrUpdateFilterOption}
        />
      )}
    </section>
  );
}

export default withRole(FilterOptions, ["admin"]);
