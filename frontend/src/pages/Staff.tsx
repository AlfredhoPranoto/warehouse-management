import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  GridRowsProp,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
} from "@mui/x-data-grid";
import Sidebar from "../components/Fragments/Sidebar";
import { TextField, Typography } from "@mui/material";
import { useDebounce } from "../hooks/useDebounce";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

type Staff = {
  _id: number;
  firstName: string;
  lastName: string;
  age: number;
  warehouse: string;
};

const StaffPage = () => {
  const [rows, setRows] = useState<Staff[]>();
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState<GridRowsProp>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${BASE_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Transform the data to include id property
        const transformedData = data.data.map((item: Staff) => ({
          ...item,
          id: item._id,
        }));

        setRows(transformedData);
        setFilteredRows(transformedData);
      } catch (err) {
        console.error("Error fetching inventory:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", flex: 1 },
    { field: "firstName", headerName: "First Name", flex: 1, editable: true },
    {
      field: "lastName",
      headerName: "Last Name",
      type: "string",
      flex: 1,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full Name",
      type: "string",
      flex: 2,
      editable: false,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "age",
      headerName: "Age",
      flex: 1,
      editable: true,
      headerAlign: "left",
      align: "left",
      type: "number",
    },
    {
      field: "warehouse",
      headerName: "Warehouse",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: ["A", "B", "C"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    if (debouncedSearchText === "") {
      setFilteredRows(rows);
    } else {
      const filteredData = rows?.filter((row) => {
        const fullName = `${row.firstName} ${row.lastName}`.toLowerCase();
        return fullName.includes(debouncedSearchText.toLowerCase());
      });
      setFilteredRows(filteredData);
    }
  }, [debouncedSearchText, rows]);

  const handleEditClick = (id: GridRowId) => () => {
    return navigate(`/users/edit/${id}`);
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    await axios.delete(`${BASE_URL}/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const newRows = rows?.filter((row) => row._id !== id);
    setRows(newRows);
    setFilteredRows(newRows);
  };

  return (
    <Sidebar>
      <Box
        sx={{
          height: 530,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4" component="h2" fontWeight="bold">
            Staffs
          </Typography>
          <TextField
            sx={{ backgroundColor: "white", borderRadius: 1 }}
            variant="outlined"
            size="small"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by name.."
          />
        </Box>
        <DataGrid
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ paddingInline: 2 }}
          rows={filteredRows}
          columns={columns}
        />
      </Box>
    </Sidebar>
  );
};

export default StaffPage;
